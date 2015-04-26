package com.google.dao.impl;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.google.dao.AdminDao;
import com.google.dao.util.JdbcConnectionPool;
import com.google.entity.Admin;
import com.google.exception.DaoException;
import com.mysql.jdbc.Connection;

public class AdminDaoImpl implements AdminDao {

	private static JdbcConnectionPool connectionPool;

	public AdminDaoImpl() {
		connectionPool = new JdbcConnectionPool();
	}

	public void updatePassword(String password) throws DaoException {
		Connection connection = connectionPool.getConnectionFromPool();
		PreparedStatement preparedStatement = null;
		try {
			String query = "update Admin set password = ? where idAdmin = ?";
			preparedStatement = connection.prepareStatement(query);
			preparedStatement.setString(1, password);
			preparedStatement.setInt(2, 666);

			preparedStatement.executeUpdate();
		} catch (SQLException e) {
			System.out
					.print(" SQLException in method AdminDaoImpl.updatePassword : "
							+ e.getMessage());
			throw new DaoException(e);
		} catch (Exception e) {
			System.out.print(" Exception  in method AdminDaoImpl.updatePassword  "
					+ e.getMessage());
			throw new DaoException(e);
		} finally {
			connectionPool.returnConnectionToPool(connection);
		}

	}

	public void updateEmail(String email) throws DaoException {
		Connection connection = connectionPool.getConnectionFromPool();
		PreparedStatement preparedStatement = null;
		try {
			String query = "update Admin set email = ? where idAdmin = ?";
			preparedStatement = connection.prepareStatement(query);
			preparedStatement.setString(1, email);
			preparedStatement.setInt(2, 666);

			preparedStatement.executeUpdate();
		} catch (SQLException e) {
			System.out
					.print(" SQLException in method AdminDaoImpl.updateEmail : "
							+ e.getMessage());
			throw new DaoException(e);
		} catch (Exception e) {
			System.out.print(" Exception  in method AdminDaoImpl.updateEmail "
					+ e.getMessage());
			throw new DaoException(e);
		} finally {
			connectionPool.returnConnectionToPool(connection);
		}

	}


	@Override
	public Admin getAdmin() throws DaoException {
		Connection connection = connectionPool.getConnectionFromPool();
		String password = null;
		String email = null;
		try {
			String query = " select password, email from Admin where idAdmin = ?";
			PreparedStatement stmt = connection.prepareStatement(query);
			stmt.setInt(1, 666);
			ResultSet rs = stmt.executeQuery();
			// Extact result from ResultSet rs
			while (rs.next()) {
				password = rs.getString("password");
				email = rs.getString("email");
			}
			// close ResultSet rs
			rs.close();

		} catch (SQLException e) {
			System.out
					.print(" SQLException in method AdminDaoImpl.selectPassword  : "
							+ e.getMessage());
			throw new DaoException(e);
		} catch (Exception e) {
			System.out.print(" Exception  in method AdminDaoImpl.selectPassword  "
					+ e.getMessage());
			throw new DaoException(e);
		} finally {
			connectionPool.returnConnectionToPool(connection);
		}
		return new Admin(password, email);
	}

}
