package com.google.dao.impl;

import java.io.Serializable;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.google.dao.GenericDao;
import com.google.dao.util.JdbcConnectionPool;
import com.google.entity.Marker;
import com.google.entity.Route;
import com.google.exception.DaoException;
import com.mysql.jdbc.Connection;
import com.mysql.jdbc.Statement;

public class MarkerDaoImpl implements GenericDao<Marker, Serializable> {

	private static JdbcConnectionPool connectionPool;

	public MarkerDaoImpl() {
		connectionPool = new JdbcConnectionPool();
	}

	public void insert(Marker object) throws DaoException {
		Connection connection = connectionPool.getConnectionFromPool();
		try {

			PreparedStatement preparedStatement = null;
			String insertSQL = "INSERT INTO marker"
					+ "(name,description, address, imageUrl, iconUrl, site, latitude, longitude, route, fk_category) VALUES"
					+ "(?,?,?,?,?,?,?,?,?,?)";
			preparedStatement = connection.prepareStatement(insertSQL);
			preparedStatement.setString(1, object.getName());
			preparedStatement.setString(2, object.getDescription());
			preparedStatement.setString(3, object.getAddress());
			preparedStatement.setString(4, object.getImageUrl());
			preparedStatement.setString(5, object.getIconUrl());
			preparedStatement.setString(6, object.getSite());
			preparedStatement.setDouble(7, object.getLatitude());
			preparedStatement.setDouble(8, object.getLongitude());
			preparedStatement.setString(9, object.getRouteStr());
			preparedStatement.setFloat(10, object.getFk_category());

			preparedStatement.executeUpdate();
		} catch (SQLException e) {
			System.out.print(" SQLException in method MarkerDaoImpl.insert : "
					+ e.getMessage());
			throw new DaoException(e);
		} catch (Exception e) {
			System.out.print(" Exception  in method MarkerDaoImpl.insert "
					+ e.getMessage());
			throw new DaoException(e);
		} finally {
			connectionPool.returnConnectionToPool(connection);
		}
	}

	public Marker getByPK(int key) throws DaoException {
		Connection connection = connectionPool.getConnectionFromPool();
		Marker marker = null;
		try {
			String query = " select * from Marker where idMarker = ?";
			PreparedStatement stmt = connection.prepareStatement(query);
			stmt.setInt(1, key);
			ResultSet rs = stmt.executeQuery();
			// Extact result from ResultSet rs
			while (rs.next()) {
				marker = new Marker(rs.getInt("idMarker"),
						rs.getString("name"), rs.getString("description"),
						rs.getString("address"), rs.getString("imageUrl"),
						rs.getString("iconUrl"), rs.getString("site"),
						rs.getDouble("latitude"), rs.getDouble("longitude"),
						rs.getString("route"), rs.getInt("fk_category"));
			}
			// close ResultSet rs
			rs.close();

		} catch (SQLException e) {
			System.out.print(" SQLException in method MarkerDaoImpl.getByPK : "
					+ e.getMessage());
			throw new DaoException(e);
		} catch (Exception e) {
			System.out.print(" Exception  in method MarkerDaoImpl.getByPK "
					+ e.getMessage());
			throw new DaoException(e);
		} finally {
			connectionPool.returnConnectionToPool(connection);
		}
		return marker;
	}

	public void update(Marker object) throws DaoException {
		Connection connection = connectionPool.getConnectionFromPool();
		PreparedStatement preparedStatement = null;
		try {
			String query = "update marker set name = ?,description = ?,address = ?, imageUrl = ?, iconUrl = ?, site = ?, latitude = ?, longitude = ?, route = ?, fk_category = ? where idMarker = ?";
			preparedStatement = connection.prepareStatement(query);
			preparedStatement.setString(1, object.getName());
			preparedStatement.setString(2, object.getDescription());
			preparedStatement.setString(3, object.getAddress());
			preparedStatement.setString(4, object.getImageUrl());
			preparedStatement.setString(5, object.getIconUrl());
			preparedStatement.setString(6, object.getSite());
			preparedStatement.setDouble(7, object.getLatitude());
			preparedStatement.setDouble(8, object.getLongitude());
			preparedStatement.setString(9, object.getRouteStr());
			preparedStatement.setFloat(10, object.getFk_category());
			preparedStatement.setInt(11, object.getId());

			preparedStatement.executeUpdate();
		} catch (SQLException e) {
			System.out.print(" SQLException in method MarkerDaoImpl.update : "
					+ e.getMessage());
			throw new DaoException(e);
		} catch (Exception e) {
			System.out.print(" Exception  in method MarkerDaoImpl.update "
					+ e.getMessage());
			throw new DaoException(e);
		} finally {
			connectionPool.returnConnectionToPool(connection);
		}

	}

	public void delete(Marker object) throws DaoException {
		Connection connection = connectionPool.getConnectionFromPool();
		try {
			PreparedStatement preparedStatement = null;
			String deleteSQL = "DELETE FROM marker" + " WHERE idMarker = ?";
			preparedStatement = connection.prepareStatement(deleteSQL);
			preparedStatement.setInt(1, object.getId());
			preparedStatement.executeUpdate();
		} catch (SQLException e) {
			System.out.print(" SQLException in method MarkerDaoImpl.delete : "
					+ e.getMessage());
			throw new DaoException(e);
		} catch (Exception e) {
			System.out.print(" Exception  in method MarkerDaoImpl.delete "
					+ e.getMessage());
			throw new DaoException(e);
		} finally {
			connectionPool.returnConnectionToPool(connection);
		}

	}

	public List<Marker> getAll() throws DaoException {
		Connection connection = connectionPool.getConnectionFromPool();
		Marker marker = null;
		List<Marker> markers = new ArrayList<Marker>();
		try {
			String query = " select * from Marker;";
			Statement stmt = (Statement) connection.createStatement();
			ResultSet rs = stmt.executeQuery(query);
			// Extact result from ResultSet rs
			while (rs.next()) {
				marker = new Marker(rs.getInt("idMarker"),
						rs.getString("name"), rs.getString("description"),
						rs.getString("address"), rs.getString("imageUrl"),
						rs.getString("iconUrl"), rs.getString("site"),
						rs.getDouble("latitude"), rs.getDouble("longitude"),
						rs.getString("route"), rs.getInt("fk_category"));
				markers.add(marker);
			}
			// close ResultSet rs
			rs.close();

		} catch (SQLException e) {
			System.out.print(" SQLException in method MarkerDaoImpl.getAll : "
					+ e.getMessage());
			throw new DaoException(e);
		} catch (Exception e) {
			System.out.print(" Exception  in method MarkerDaoImpl.getAll "
					+ e.getMessage());
			throw new DaoException(e);
		} finally {
			connectionPool.returnConnectionToPool(connection);
		}
		return markers;
	}

	public Long getCount() throws DaoException {
		Connection connection = connectionPool.getConnectionFromPool();
		Long count = null;
		try {
			String query = " select count(*) from Marker";
			Statement stmt = (Statement) connection.createStatement();
			ResultSet rs = stmt.executeQuery(query);
			// Extact result from ResultSet rs
			while (rs.next()) {
				count = rs.getLong("count(*)");
			}
			// close ResultSet rs
			rs.close();

		} catch (SQLException e) {
			System.out
					.print(" SQLException in method MarkerDaoImpl.getCount : "
							+ e.getMessage());
			throw new DaoException(e);
		} catch (Exception e) {
			System.out.print(" Exception  in method MarkerDaoImpl.getCount "
					+ e.getMessage());
			throw new DaoException(e);
		} finally {
			connectionPool.returnConnectionToPool(connection);
		}
		return count;
	}

	public List<Marker> getByFK(int fk) throws DaoException {
		Connection connection = connectionPool.getConnectionFromPool();
		Marker marker = null;
		List<Marker> markers = new ArrayList<Marker>();
		try {
			String query = " select * from Marker where fk_category = ?";
			PreparedStatement stmt = connection.prepareStatement(query);
			stmt.setInt(1, fk);
			ResultSet rs = stmt.executeQuery();
			// Extact result from ResultSet rs
			while (rs.next()) {
				marker = new Marker(rs.getInt("idMarker"),
						rs.getString("name"), rs.getString("description"),
						rs.getString("address"), rs.getString("imageUrl"),
						rs.getString("iconUrl"), rs.getString("site"),
						rs.getDouble("latitude"), rs.getDouble("longitude"),
						rs.getString("route"), rs.getInt("fk_category"));
				markers.add(marker);
			}
			// close ResultSet rs
			rs.close();

		} catch (SQLException e) {
			System.out.print(" SQLException in method MarkerDaoImpl.getByFK : "
					+ e.getMessage());
			throw new DaoException(e);
		} catch (Exception e) {
			System.out.print(" Exception  in method MarkerDaoImpl.getByFK "
					+ e.getMessage());
			throw new DaoException(e);
		} finally {
			connectionPool.returnConnectionToPool(connection);
		}
		return markers;
	}

}
