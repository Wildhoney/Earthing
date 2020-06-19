from flask import Flask
from geopy import distance

app = Flask(__name__)

# SELECT ST_AsText(ST_MakeLine(ST_MakePoint(0.1278, 51.5074), ST_MakePoint(49.614232010011484, 39.202349184488774)))
# SELECT ST_Expand(ST_GeomFromText(@linestring, 2163), 5)
# SELECT ST_Intersects(polygon, @polygon::geometry);


@app.route("/")
def catch_all():
    position = distance.distance(miles=2500).destination((51.5074, 0.1278), 90)
    return {"lat": position.latitude, "lng": position.longitude}
