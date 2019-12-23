package com.pharmacy.dao;

import java.util.List;

import com.pharmacy.pojo.Medicine;

public interface DAOMedicineInterface {

	public void save(Medicine medicine);
	
	public Medicine getOneById(int id);
	public List<Medicine> getAll();
	
	public void update(Medicine medicine);
	public void deleteOneById(int id);

}