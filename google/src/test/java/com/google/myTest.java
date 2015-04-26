/*
package com.google;

import java.util.List;

import org.junit.Test;

import com.google.dao.impl.AdminDaoImpl;
import com.google.dao.impl.MarkerDaoImpl;
import com.google.dao.impl.MarkersCategoryDaoImpl;
import com.google.entity.Marker;
import com.google.entity.MarkersCategory;
import com.google.entity.Route;
import com.google.exception.DaoException;
import com.google.gson.Gson;

public class myTest {

	@Test
	public void testMarkerDao() {
		MarkerDaoImpl markerDao = new MarkerDaoImpl();
		
		
		try {
			markerDao.getCount();

		
		//Count
		System.out.print("Count: " + markerDao.getCount());
		
		//insert
		   double d [][]= {
			        {0.5546565, 0.254554},
			        {0.5054466, 1.154564},
			        {0.5782336, 0.7546545},
			        {0.5545426, 0.7565654},
			        {0.5545454,  0.45465}
			    };
		   Gson gson = new Gson();
		   String numbersJson = gson.toJson(d);
		   
		Marker m1 = new Marker(1, "marker1", "description of marker1,",
				"http/", "dfsdf", 47.0612751, 28.8664807, new Route(numbersJson), 1);

		markerDao.insert(m1);
		System.out.println("inserc competed");
		
		//getAll
		List<Marker> markers = markerDao.getAll();
		System.out.println("getAll competed");
		System.out.println(markers.get(0).getName());
		
		//getByPk
		Marker m;
		m = markerDao.getByPK(markers.get(1).getId());
		System.out.println("getByPK competed");
		System.out.println(m.getName() + "  " + m.getDescription());	
		
		
		//delete
		markerDao.delete(markers.get(0));
		System.out.println("delete competed");

		//update
		Marker m2 = null;
		m2 = markers.get(1);
		m2.setDescription("test");
		markerDao.update(m2);
		System.out.println("update competed");
		
		} catch (DaoException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	
	@Test
	public void testCategoriesDao() {
		MarkersCategoryDaoImpl categoryDao = new MarkersCategoryDaoImpl();
		
		MarkersCategory categoryT = new MarkersCategory(0, "TestCategory","descriere categorie markere",true);
		
		
		try {
			categoryDao.insert(categoryT);
			
			List<MarkersCategory> categories = null;
			categories = categoryDao.getAll();
			
			categoryDao.delete(categories.get(1));

			MarkersCategory category = new MarkersCategory(categories.get(0).getId(), "category update", "update", true);
			categoryDao.update(category);
		} catch (DaoException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	
	@Test
	public void testAdminDao() {
		
		AdminDaoImpl adminDao = new AdminDaoImpl();
		
		try {
			Admin admin = adminDao.getAdmin();
			
			admin.setEmail("raduzmeu@gmail.com");
			admin.setPassword("raduzmeu@gmail.com");

		} catch (DaoException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}
	
	
	
	
	
	
	
	

}
*/