package com.pharmacy.dao;

import java.util.List;

import com.pharmacy.pojo.User;

public interface DAOUserInterface {

	public void save(User user);
	
	public User getOneById(int id);
	public User getOneAdminById(int id);
	public List<User> getAll();
	
	public void update(User user);
	public void deleteOneById(int id);

}