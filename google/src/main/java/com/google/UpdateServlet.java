package com.google;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.google.dao.impl.MarkerDaoImpl;
import com.google.dao.impl.MarkersCategoryDaoImpl;
import com.google.entity.Marker;
import com.google.entity.MarkersCategory;
import com.google.exception.DaoException;

public class UpdateServlet extends HttpServlet{

	MarkersCategoryDaoImpl categoryDao = new MarkersCategoryDaoImpl();
	MarkerDaoImpl markerDao = new MarkerDaoImpl();
	
	
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		
		
		String title = "", description = "";
		String requestType = req.getParameter("requestType");
		HttpSession session=req.getSession();  
		
		switch(requestType) {
		case "addCategory":
		
		title = req.getParameter("title");	
		description = req.getParameter("description");
		String id = req.getParameter("categoryId");
		int categoryId = Integer.parseInt(id);
		
		MarkersCategory categoryT = new MarkersCategory(categoryId, title, description, true);

			try {
				categoryDao.update(categoryT);
				System.out.println("update succes");
			} catch (DaoException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
			//session.setAttribute("result","succes");
			resp.sendRedirect("explore.jsp");
			break;
			
			
		case "addMarker":

			String id2 = req.getParameter("markerId");
			int markerId = Integer.parseInt(id2);
			title = req.getParameter("title");
			description = req.getParameter("description");
			String category = req.getParameter("ptype");
			String latitude = req.getParameter("latitude");
			String longitude = req.getParameter("longitude");
			String route = req.getParameter("route");
			String site = req.getParameter("webSite");
			String iconUrl = req.getParameter("iconUrl");
			String imageUrl = req.getParameter("imageUrl");
			String address = req.getParameter("address");
			
			Marker m = new Marker(markerId, title,description,address, imageUrl, iconUrl, site,  Double.parseDouble(latitude), Double.parseDouble(longitude),
					route,Integer.parseInt(category));
			
			try {
				markerDao.update(m);
			} catch (DaoException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
			/*
			System.out.println(title);
			System.out.println(description);
			System.out.println(category);
			System.out.println(latitude);
			System.out.println(longitude);
			System.out.println(route);
			System.out.println(site);
			System.out.println(iconUrl);
			System.out.println(imageUrl);
			*/
			
			
			//session.setAttribute("result","succes");
			
			resp.sendRedirect("explore.jsp");
			break;
	}
		
		
	}
	
}
