package com.google;

import java.io.IOException;
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
import com.google.dao.impl.MarkersCategoryDaoImpl;
import com.google.entity.Marker;
import com.google.entity.MarkersCategory;
import com.google.exception.DaoException;

public class SingleServlet extends HttpServlet{
	
	MarkerDaoImpl markerDao = new MarkerDaoImpl();
	MarkersCategoryDaoImpl categoryDao = new MarkersCategoryDaoImpl();
	Marker marker = null;
	MarkersCategory category = null;
	List<MarkersCategory> categories = null;
	
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {

		HttpSession session=req.getSession();  
		String markerId;
		int id = 0;
		marker = null;
			
		try {
			markerId = req.getParameter("Id");
			id = Integer.parseInt(markerId);
			System.out.println(id);
			marker = markerDao.getByPK(id);
			categories = categoryDao.getAll();
			category = categoryDao.getByPK(marker.getFk_category());
			
		} catch (DaoException e) {
			System.out.println("exception");
			e.printStackTrace();
		}
		
		if(marker == null) {
			req.getRequestDispatcher("/WEB-INF/explore.jsp").forward(req, resp);
			return;
		}
		System.out.println("size:" + categories.size());
		session.setAttribute("categories", categories);
		session.setAttribute("category", category);
		session.setAttribute("idMarker", id);
		session.setAttribute("marker", marker);
		//System.out.println("hello");
		req.getRequestDispatcher("/WEB-INF/single.jsp").forward(req, resp);
	}
	
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		
		JSONObject markerJson;
		
		HttpSession session=req.getSession();  
		
		marker = (Marker) session.getAttribute("marker");

		try {
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
			

			resp.setContentType("application/json");
			resp.getWriter().write(markerJson.toString());

		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
	}
	

}
