package com.google.dao;

import java.io.Serializable;
import java.util.List;

import com.google.exception.DaoException;

public interface GenericDao<T, PK extends Serializable>{


    /** Создает новую запись, соответствующую объекту object */
    public void insert(T object)  throws DaoException;

    /** Возвращает объект соответствующий записи с первичным ключом key или null */
    public T getByPK(int key) throws DaoException;

    /** Сохраняет состояние объекта group в базе данных */
    public void update(T object) throws DaoException;

    /** Удаляет запись об объекте из базы данных */
    public void delete(T object) throws DaoException;

    /** Возвращает список объектов соответствующих всем записям в базе данных */
    public List<T> getAll() throws DaoException;
    
    /** Возвращает число записей*/
    Long getCount() throws DaoException;
}
