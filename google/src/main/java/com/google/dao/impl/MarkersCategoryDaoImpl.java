package com.google.dao.impl;

import java.io.Serializable;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.google.dao.GenericDao;
import com.google.dao.util.JdbcConnectionPool;
import com.google.entity.MarkersCategory;
import com.google.exception.DaoException;
import com.mysql.jdbc.Connection;
import com.mysql.jdbc.Statement;

public class MarkersCategoryDaoImpl implements GenericDao<MarkersCategory, Serializable>{
	
	private static JdbcConnectionPool connectionPool;

	public MarkersCategoryDaoImpl() {
		connectionPool = new JdbcConnectionPool();
	}

	public void insert(MarkersCategory object) throws DaoException {
		Connection connection = connectionPool.getConnectionFromPool();
		try {

			PreparedStatement preparedStatement = null;
			String insertSQL = "INSERT INTO category"
					+ "(name,description, publicMap) VALUES"
					+ "(?,?,?)";
			preparedStatement = connection.prepareStatement(insertSQL);
			preparedStatement.setString(1, object.getName());
			preparedStatement.setString(2, object.getDescription());
			preparedStatement.setByte(3, (byte)(object.isPublicMap()?1:0));

			preparedStatement.executeUpdate();
		} catch (SQLException e) {
			System.out
					.print(" SQLException in method MarkersCategoryDaoImpl.insert : "
							+ e.getMessage());
			throw new DaoException(e);
		} catch (Exception e) {
			System.out.print(" Exception  in method MarkersCategoryDaoImpl.insert "
					+ e.getMessage());
			throw new DaoException(e);
		} finally {
			
			connectionPool.returnConnectionToPool(connection);
		}
		
	}

	public MarkersCategory getByPK(int key) throws DaoException {
		Connection connection = connectionPool.getConnectionFromPool();
		MarkersCategory category = null;
		try {
			String query = " select * from category where idCategory = ?";
			PreparedStatement stmt = connection.prepareStatement(query);
			stmt.setInt(1, key);
			ResultSet rs = stmt.executeQuery();
			// Extact result from ResultSet rs
			while (rs.next()) {
				category = new MarkersCategory(rs.getInt("idCategory"), rs.getString("name"), rs.getString("description"), (rs.getByte("publicMap")!=0));
			}
			// close ResultSet rs
			rs.close();

		} catch (SQLException e) {
			System.out
					.print(" SQLException in method MarkersCategoryDaoImpl.getByPK : "
							+ e.getMessage());
			throw new DaoException(e);
		} catch (Exception e) {
			System.out.print(" Exception  in method MarkersCategoryDaoImpl.getByPK "
					+ e.getMessage());
			throw new DaoException(e);
		} finally {
			connectionPool.returnConnectionToPool(connection);
		}
		return category;
	}

	public void update(MarkersCategory object) throws DaoException {
		Connection connection = connectionPool.getConnectionFromPool();
		PreparedStatement preparedStatement = null;
		try {
			String query = "update category set name = ?,description = ?, publicMap = ? where idCategory = ?";
			preparedStatement = connection.prepareStatement(query);
			preparedStatement.setString(1, object.getName());
			preparedStatement.setString(2, object.getDescription());
			preparedStatement.setByte(3, (byte)(object.isPublicMap()?1:0));
			preparedStatement.setInt(4, object.getId());

			preparedStatement.executeUpdate();
		} catch (SQLException e) {
			System.out
					.print(" SQLException in method MarkersCategoryDaoImpl.update : "
							+ e.getMessage());
			throw new DaoException(e);
		} catch (Exception e) {
			System.out.print(" Exception  in method MarkersCategoryDaoImpl.update "
					+ e.getMessage());
			throw new DaoException(e);
		} finally {
			connectionPool.returnConnectionToPool(connection);
		}

		
	}

	public void delete(MarkersCategory object) throws DaoException {
		Connection connection = connectionPool.getConnectionFromPool();
		try {
			PreparedStatement preparedStatement = null;
			String deleteSQL = "DELETE FROM category" + " WHERE idCategory = ?";
			preparedStatement = connection.prepareStatement(deleteSQL);
			preparedStatement.setInt(1, object.getId());
			preparedStatement.executeUpdate();
		} catch (SQLException e) {
			System.out
					.print(" SQLException in method MarkersCategoryDaoImpl.delete : "
							+ e.getMessage());
			throw new DaoException(e);
		} catch (Exception e) {
			System.out.print(" Exception  in method MarkersCategoryDaoImpl.delete "
					+ e.getMessage());
			throw new DaoException(e);
		} finally {
			connectionPool.returnConnectionToPool(connection);
		}
	}

	public List<MarkersCategory> getAll() throws DaoException {
		Connection connection = connectionPool.getConnectionFromPool();
		MarkersCategory category = null;
		List<MarkersCategory> categories = new ArrayList<MarkersCategory>();
		try {
			String query = " select * from category;";
			Statement stmt = (Statement) connection.createStatement();
			ResultSet rs = stmt.executeQuery(query);
			// Extact result from ResultSet rs
			while (rs.next()) {
				category = new MarkersCategory(rs.getInt("idCategory"), rs.getString("name"), rs.getString("description"), (rs.getByte("publicMap")!=0));
				categories.add(category);
			}
			// close ResultSet rs
			rs.close();

		} catch (SQLException e) {
			System.out
					.print(" SQLException in method MarkersCategoryDaoImpl.getAll : "
							+ e.getMessage());
			throw new DaoException(e);
		} catch (Exception e) {
			System.out.print(" Exception  in method MarkersCategoryDaoImpl.getAll "
					+ e.getMessage());
			throw new DaoException(e);
		} finally {
			connectionPool.returnConnectionToPool(connection);
		}
		return categories;
	}

	public Long getCount() throws DaoException {
		Connection connection = connectionPool.getConnectionFromPool();
		Long count = null;
		try {
			String query = " select count(*) from category";
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
					.print(" SQLException in method MarkersCategoryDaoImpl.getCount : "
							+ e.getMessage());
			throw new DaoException(e);
		} catch (Exception e) {
			System.out.print(" Exception  in method MarkersCategoryDaoImpl.getCount "
					+ e.getMessage());
			throw new DaoException(e);
		} finally {
			connectionPool.returnConnectionToPool(connection);
		}
		return count;
	}

}
