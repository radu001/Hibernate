package com.google.entity;

import java.util.ArrayList;
import java.util.List;

public class MarkersCategory extends BaseEntity {

	private String description;
	private List<Marker> markers;
	private boolean publicMap;

	public MarkersCategory(int id, String title, String description,
			boolean publicMap) {
		setName(title);
		setId(id);
		this.description = description;
		this.publicMap = publicMap;

		markers = new ArrayList<Marker>();
	}

	public boolean addMarker(Marker marker) {
		return markers.add(marker);
	}

	public boolean removeMarker(Marker marker) {
		return markers.remove(marker);
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public List<Marker> getMarkers() {
		return markers;
	}

	public boolean isPublicMap() {
		return publicMap;
	}

	public void setPublicMap(boolean publicMap) {
		this.publicMap = publicMap;
	}

}
