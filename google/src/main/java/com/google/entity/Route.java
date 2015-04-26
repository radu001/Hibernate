package com.google.entity;

import java.util.ArrayList;
import java.util.List;

import com.google.gson.Gson;
import com.google.other.Point2D;

public class Route extends BaseEntity{
	private List<Point2D> route;
	
	public	Route(String s) {
		route = new ArrayList<Point2D>();
		route.clear();
		Gson gson = new Gson();
		float[][] dataMap = gson.fromJson(s, float[][].class);
		for (float[] i : dataMap){
			route.add(new Point2D(i[0], i[1]));
		}
	}
	public	Route(int id, String name) {
		setId(id);
		setName(name);
		route = new ArrayList<Point2D>();
	}
	
	public boolean addPoint(Point2D point) {
		route.add(point);
		return true;
	}
	
	public double getDistance(Marker marker) {
		return 0;
	}
	
	public double getRouteDistance(Marker marker) {
		return 0;
	}
	
	public List<Point2D> getRoute() {
		return route;
	}
	
	public String getJSONString() {
		String s = "[";
		for(int i = 0; i < route.size(); i++){
			s += "[" + route.get(i).getLongitude() + "," + route.get(i).getLatitude() + "]";
			if(i != route.size() - 1)
				s += ",";
		}
		s += "]";
		return s;
	}

	public double[][] getDoubleArray(String s) {
		Gson gson = new Gson();
		 double[][] dataMap = gson.fromJson(s, double[][].class);
		return dataMap;
	}

	public void GSONStringToRoute(String s){
		route.clear();
		Gson gson = new Gson();
		double[][] dataMap = gson.fromJson(s, double[][].class);
		for (double[] i : dataMap){
			route.add(new Point2D(i[0], i[1]));
		}
	}
	
}
