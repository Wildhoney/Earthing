from flask import Flask, Response
from geopy import distance

app = Flask(__name__)


@app.route("/")
def catch_all():
    position = distance.distance(miles=2500).destination((51.5074, 0.1278), 90)
    return Response(
        "%s, %s" % position.latitude, position.longitude, mimetype="text/html"
    )
