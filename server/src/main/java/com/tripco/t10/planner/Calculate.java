package com.tripco.t10.planner;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import com.tripco.t10.server.HTTP;
import java.util.ArrayList;
import spark.Request;


/*
 * This class converts from Gson to Json and sets distance.
 */
public class Calculate {
    private Distance distance;
    private ArrayList<Place> places;

    public Calculate(ArrayList<Place> places){
        this.places = places;
    }
    /*
     * This method does the conversion.
     */
    public Calculate (Request request){

        // first print the request
//        System.out.println(HTTP.echoRequest(request));

        // extract the information from the body of the request.
        JsonParser jsonParser = new JsonParser();
        JsonElement requestBody = jsonParser.parse(request.body());

        // convert the body of the request to a Distance object.
        Gson gson = new Gson();
        distance = gson.fromJson(requestBody, Distance.class);

        double[] coordinates = {distance.getOrigin().latitude,
                                distance.getDestination().latitude,
                                distance.getOrigin().longitude,
                                distance.getDestination().longitude,};

        distance.setDistance(distance.calculateDistance(coordinates, distance.getUnits(),distance.getUserUnit()));

    }

    /*
     * This method gets the distance.
     * Then converts to json.
     */
    public String getDistance() {
        Gson gson = new Gson();
        return gson.toJson(distance);
    }

}
