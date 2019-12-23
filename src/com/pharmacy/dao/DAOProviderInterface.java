package com.pharmacy.dao;

import java.util.List;

import com.pharmacy.pojo.Provider;

public interface DAOProviderInterface {

	public void save(Provider provider);
	
	public Provider getOneById(int id);
	public List<Provider> getAll();
	
	public void update(Provider provider);
	public void deleteOneById(int id);

}