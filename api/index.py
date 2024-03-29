import os
import psycopg2
from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
cors = CORS(app, resources={r"*": {"origins": "*"}})

conn = psycopg2.connect(
    "host={db_host} dbname={db_name} user={db_username} password={db_password}".format(
        db_host=os.getenv("DB_HOST"),
        db_name=os.getenv("DB_NAME"),
        db_username=os.getenv("DB_USERNAME"),
        db_password=os.getenv("DB_PASSWORD"),
    )
)


def get_sql(latitude, longitude, bearing):
    return """
        SELECT
            ARRAY_AGG(id) AS pks,
            name,
            code,
            COUNT(*) AS occurrences,
            MIN(
                ST_Distance(
                    ST_SetSRID(ST_MakePoint({longitude}, {latitude}), 4326),
                    area
                )
            ) AS minimum_distance
        FROM
            countries
        WHERE
            ST_Intersects(
                area,
                ST_SetSRID(
                    ST_MakeLine(
                        ST_Project(
                            ST_SetSRID(ST_MakePoint({longitude}, {latitude}), 4326) :: geometry,
                            0,
                            RADIANS({bearing})
                        ) :: geometry,
                        ST_Project(
                            ST_SetSRID(ST_MakePoint({longitude}, {latitude}), 4326) :: geometry,
                            6671700,
                            RADIANS({bearing})
                        ) :: geometry
                    ),
                    4326
                )
            )
            OR ST_Intersects(
                area,
                ST_SetSRID(
                    ST_MakeLine(
                        ST_Project(
                            ST_SetSRID(ST_MakePoint({longitude}, {latitude}), 4326) :: geometry,
                            6671700,
                            RADIANS({bearing})
                        ) :: geometry,
                        ST_Project(
                            ST_SetSRID(ST_MakePoint({longitude}, {latitude}), 4326) :: geometry,
                            6671700 * 2,
                            RADIANS({bearing})
                        ) :: geometry
                    ),
                    4326
                )
            )
            OR ST_Intersects(
                area,
                ST_SetSRID(
                    ST_MakeLine(
                        ST_Project(
                            ST_SetSRID(ST_MakePoint({longitude}, {latitude}), 4326) :: geometry,
                            6671700 * 2,
                            RADIANS({bearing})
                        ) :: geometry,
                        ST_Project(
                            ST_SetSRID(ST_MakePoint({longitude}, {latitude}), 4326) :: geometry,
                            6671700 * 3,
                            RADIANS({bearing})
                        ) :: geometry
                    ),
                    4326
                )
            )
            OR ST_Intersects(
                area,
                ST_SetSRID(
                    ST_MakeLine(
                        ST_Project(
                            ST_SetSRID(ST_MakePoint({longitude}, {latitude}), 4326) :: geometry,
                            0,
                            RADIANS({bearing} + 180)
                        ) :: geometry,
                        ST_Project(
                            ST_SetSRID(ST_MakePoint({longitude}, {latitude}), 4326) :: geometry,
                            6671700,
                            RADIANS({bearing} + 180)
                        ) :: geometry
                    ),
                    4326
                )
            )
            OR ST_Intersects(
                area,
                ST_SetSRID(
                    ST_MakeLine(
                        ST_Project(
                            ST_SetSRID(ST_MakePoint({longitude}, {latitude}), 4326) :: geometry,
                            6671700,
                            RADIANS({bearing} + 180)
                        ) :: geometry,
                        ST_Project(
                            ST_SetSRID(ST_MakePoint({longitude}, {latitude}), 4326) :: geometry,
                            6671700 * 2,
                            RADIANS({bearing} + 180)
                        ) :: geometry
                    ),
                    4326
                )
            )
            OR ST_Intersects(
                area,
                ST_SetSRID(
                    ST_MakeLine(
                        ST_Project(
                            ST_SetSRID(ST_MakePoint({longitude}, {latitude}), 4326) :: geometry,
                            6671700 * 2,
                            RADIANS({bearing} + 180)
                        ) :: geometry,
                        ST_Project(
                            ST_SetSRID(ST_MakePoint({longitude}, {latitude}), 4326) :: geometry,
                            6671700 * 3,
                            RADIANS({bearing} + 180)
                        ) :: geometry
                    ),
                    4326
                )
            )
        GROUP BY
            name, code
        ORDER BY
            minimum_distance
    """.format(
        latitude=latitude, longitude=longitude, bearing=bearing
    )


@app.route("/<latitude>/<longitude>/<bearing>")
@app.route("/api/<latitude>/<longitude>/<bearing>")
def get(latitude, longitude, bearing):
    cursor = conn.cursor()
    sql = get_sql(latitude, longitude, bearing)
    cursor.execute(sql)

    return {
        "countries": [
            {
                "pks": pks,
                "name": name,
                "code": code,
                "occurrences": occurrences,
                "minimum_distance": minimum_distance,
            }
            for (pks, name, code, occurrences, minimum_distance) in cursor.fetchall()
        ]
    }
