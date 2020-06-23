import os
import psycopg2
from flask import Flask
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

conn = psycopg2.connect(
    "host={db_host} dbname={db_name} user={db_username} password={db_password}".format(
        db_host=os.getenv("DB_HOST"),
        db_name=os.getenv("DB_NAME"),
        db_username=os.getenv("DB_USERNAME"),
        db_password=os.getenv("DB_PASSWORD"),
    )
)


@app.route("/<latitude>/<longitude>/<bearing>")
def get(latitude, longitude, bearing):
    cursor = conn.cursor()
    cursor.execute(
        """
        SELECT
            name,
            ST_Distance(ST_SetSRID(ST_MakePoint({longitude}, {latitude}), 4326), area) AS distance
        FROM countries
        WHERE
            ST_Intersects(ST_Transform(
            ST_Segmentize(
                ST_MakeLine(
                -- ST_Transform(ST_SetSRID(ST_MakePoint({longitude}, {latitude}), 4326), 953027),
                -- ST_Transform(ST_SetSRID(ST_AsText(ST_Project(ST_MakePoint(0.1278, 51.5074), 10000000, radians({bearing}))), 4326), 953027)
                ST_SetSRID(ST_MakePoint({longitude}, {latitude}), 4326),
                ST_SetSRID(ST_AsText(ST_Project(ST_MakePoint(0.1278, 51.5074), 10000000, radians({bearing}))), 4326)
                ), 
            1000000), 
            4326), area)
        ORDER BY ST_Distance(ST_SetSRID(ST_MakePoint({longitude}, {latitude}), 4326), area);
    """.format(
            latitude=latitude, longitude=longitude, bearing=bearing
        )
    )

    return {
        "countries": [
            {"name": name, "distance": distance}
            for (name, distance) in cursor.fetchall()
        ]
    }
