package com.google;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.google.dao.impl.MarkerDaoImpl;
import com.google.entity.Marker;
import com.google.exception.DaoException;

public class GetMarkersServlet extends HttpServlet {
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {

		HttpSession session=req.getSession(); 
		BufferedReader br = new BufferedReader(new InputStreamReader(
				req.getInputStream()));
		String json = "";
		if (br != null) {
			json = br.readLine();
		}

		System.out.print(json);
		String requestStr = null;
		JSONArray arr = null;

		try {
			JSONObject obj = new JSONObject(json);
			arr = obj.getJSONArray("data");
			requestStr = arr.getJSONObject(0).getString("request");
			System.out.println(requestStr);

		} catch (JSONException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}

		switch (requestStr) {

		// get Categories
		case "getMarkers":
			JSONObject jsonResp2 = new JSONObject();
			JSONArray markersJson = new JSONArray();
			JSONObject markerJson;

			try {
				String categoryId = arr.getJSONObject(0).getString("categoryId");
				int categoryIdInt = Integer.parseInt(categoryId);
				MarkerDaoImpl markerDao = new MarkerDaoImpl();
				List<Marker> markers = null;
				if(categoryIdInt != -1)
				markers = markerDao.getByFK(categoryIdInt);
				else markers = markerDao.getAll();
				

				for (Marker marker : markers) {
					markerJson = new JSONObject();

					markerJson.put("Name", marker.getName());
					markerJson.put("Id", marker.getId());
					markerJson.put("Description", marker.getDescription());
					markerJson.put("Address", marker.getAddress());
					markerJson.put("ImageUrl", marker.getImageUrl());
					markerJson.put("IconUrl", marker.getIconUrl());
					markerJson.put("Site", marker.getSite());
					markerJson.put("Latitude", marker.getLatitude());
					markerJson.put("Longitude", marker.getLongitude());
					markerJson.put("Route", marker.getRouteStr());

					markersJson.put(markerJson);
				}

				jsonResp2.put("Markers", markersJson);
				session.setAttribute("markers", markers);

				resp.setContentType("application/json");
				resp.getWriter().write(jsonResp2.toString());

			} catch (JSONException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (DaoException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

			break;
		}
	}
}
