package com.google.dao;

import com.google.entity.Admin;
import com.google.exception.DaoException;

public interface AdminDao {

	public void updatePassword(String password) throws DaoException;

	public void updateEmail(String email) throws DaoException;

	public Admin getAdmin() throws DaoException;

}
