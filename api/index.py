from flask import Flask
import psycopg2

app = Flask(__name__)
conn = psycopg2.connect("")


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
                ST_Transform(ST_SetSRID(ST_MakePoint({longitude}, {latitude}), 4326), 953027),
                ST_Transform(ST_SetSRID(ST_AsText(ST_Project(ST_MakePoint(0.1278, 51.5074), 10000000, radians({bearing}))), 4326), 953027)
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
