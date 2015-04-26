package com.google.entity;

public class Admin {

	private final String userName = "Admin";
	private String password;
	private String email;



	public Admin(String password, String email) {
		this.password = password;
		this.email = email;
	}


	public String getEmail() {
		return email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}


	public void setEmail(String email) {
		this.email = email;
	}

}
