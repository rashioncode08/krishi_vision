"""
KrishiVision — Database Module
Handles PostgreSQL (Neon) connection and scan history storage.
"""

import os
import psycopg2
from psycopg2.extras import RealDictCursor
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")


def get_connection():
    """Get a database connection."""
    return psycopg2.connect(DATABASE_URL, cursor_factory=RealDictCursor)


def init_db():
    """Create tables if they don't exist."""
    conn = get_connection()
    cur = conn.cursor()

    cur.execute("""
        CREATE TABLE IF NOT EXISTS scan_history (
            id SERIAL PRIMARY KEY,
            disease_name VARCHAR(255) NOT NULL,
            crop VARCHAR(255) NOT NULL,
            confidence FLOAT NOT NULL,
            image_filename VARCHAR(255),
            image_size_kb FLOAT,
            scanned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    """)

    cur.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            full_name VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password_hash VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    """)

    cur.execute("""
        CREATE TABLE IF NOT EXISTS disease_stats (
            id SERIAL PRIMARY KEY,
            disease_id VARCHAR(100) UNIQUE NOT NULL,
            disease_name VARCHAR(255) NOT NULL,
            crop VARCHAR(255) NOT NULL,
            total_scans INT DEFAULT 0,
            last_scanned TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    """)

    conn.commit()
    cur.close()
    conn.close()
    print("✅ Database tables initialized successfully")


def save_scan(disease_name: str, crop: str, confidence: float, image_filename: str = None, image_size_kb: float = None):
    """Save a scan result to the database."""
    conn = get_connection()
    cur = conn.cursor()

    # Insert scan record
    cur.execute(
        """
        INSERT INTO scan_history (disease_name, crop, confidence, image_filename, image_size_kb)
        VALUES (%s, %s, %s, %s, %s)
        RETURNING id, scanned_at;
        """,
        (disease_name, crop, confidence, image_filename, image_size_kb),
    )
    scan = cur.fetchone()

    # Update disease stats
    cur.execute(
        """
        INSERT INTO disease_stats (disease_id, disease_name, crop, total_scans, last_scanned)
        VALUES (%s, %s, %s, 1, CURRENT_TIMESTAMP)
        ON CONFLICT (disease_id)
        DO UPDATE SET total_scans = disease_stats.total_scans + 1, last_scanned = CURRENT_TIMESTAMP;
        """,
        (disease_name.lower().replace(" ", "_"), disease_name, crop),
    )

    conn.commit()
    cur.close()
    conn.close()

    return scan


def get_recent_scans(limit: int = 20):
    """Get recent scan history."""
    conn = get_connection()
    cur = conn.cursor()

    cur.execute(
        """
        SELECT id, disease_name, crop, confidence, image_filename, scanned_at
        FROM scan_history
        ORDER BY scanned_at DESC
        LIMIT %s;
        """,
        (limit,),
    )
    scans = cur.fetchall()

    cur.close()
    conn.close()

    return scans


def get_disease_stats():
    """Get disease detection statistics."""
    conn = get_connection()
    cur = conn.cursor()

    cur.execute("""
        SELECT disease_name, crop, total_scans, last_scanned
        FROM disease_stats
        ORDER BY total_scans DESC;
    """)
    stats = cur.fetchall()

    # Get total scan count
    cur.execute("SELECT COUNT(*) as total FROM scan_history;")
    total = cur.fetchone()

    cur.close()
    conn.close()

    return {"total_scans": total["total"], "by_disease": stats}


# ---------------------------------------------------------------------------
# User Authentication Functions
# ---------------------------------------------------------------------------

def get_user_by_email(email: str):
    """Fetch a user by their email address."""
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM users WHERE email = %s;", (email,))
    user = cur.fetchone()
    cur.close()
    conn.close()
    return user


def create_user(full_name: str, email: str, password_hash: str):
    """Create a new user."""
    conn = get_connection()
    cur = conn.cursor()
    try:
        cur.execute(
            "INSERT INTO users (full_name, email, password_hash) VALUES (%s, %s, %s) RETURNING id;",
            (full_name, email, password_hash)
        )
        user_id = cur.fetchone()["id"]
        conn.commit()
        return user_id
    except psycopg2.IntegrityError:
        conn.rollback()
        raise Exception("Email already exists")
    finally:
        cur.close()
        conn.close()
