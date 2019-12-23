package com.pharmacy.dao;

import java.util.List;

import com.pharmacy.pojo.Transaction;

public interface DAOTransactionInterface {

	public void save(Transaction trasanction);
	
	public Transaction getOneById(int id);
	public List<Transaction> getAll();
	
	public void update(Transaction trasanction);
	public void deleteOneById(int id);

}