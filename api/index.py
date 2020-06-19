from flask import Flask
from geopy import distance

app = Flask(__name__)


@app.route("/")
def catch_all():
    position = distance.distance(miles=2500).destination((51.5074, 0.1278), 90)

    return {"lat": position.latitude, "lng": position.longitude}
