package com.pharmacy.dao;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.pharmacy.util.HibernateUtil;

public class DAOTransaction implements DAOTransactionInterface {
	
	private static Transaction transanction;
	private static Session session;
	
	/**
	 * Saves transaction
	 * 
	 * @param transaction
	 */
	public void save(com.pharmacy.pojo.Transaction transaction) {
		try {
			
			// save transaction
			session = HibernateUtil.getSessionFactory().openSession();
			transanction = session.beginTransaction();
			session.save(transaction);
			
		} catch (Exception exceptionObj) {
			exceptionObj.printStackTrace();
		} finally {
			transanction.commit();
		}
	}
	

	/**
	 * Gets transaction by id
	 * 
	 * @param id
	 * @return transaction by id (or null)
	 */
	public com.pharmacy.pojo.Transaction getOneById(int id) {
		
		com.pharmacy.pojo.Transaction transactionToReturn = null;
		
		try {

			// get transaction
			session = HibernateUtil.getSessionFactory().openSession();
			transanction = session.beginTransaction();
			Query query = session.createQuery("from com.pharmacy.pojo.Transaction where id = " + id);
			transactionToReturn = (com.pharmacy.pojo.Transaction) query.uniqueResult();
			
		} catch (Exception exceptionObj) {
			exceptionObj.printStackTrace();
		} finally {
			transanction.commit();
		}
		return transactionToReturn;
	}

	/**
	 * Gets transaction by name
	 * 
	 * @param id
	 * @return transaction by id (or null)
	 */
	public com.pharmacy.pojo.Transaction getOneByName(String name) {
		
		com.pharmacy.pojo.Transaction transactionToReturn = null;
		
		try {
			
			// get transaction
			session = HibernateUtil.getSessionFactory().openSession();
			transanction = session.beginTransaction();
			Query query = session.createQuery("from com.pharmacy.pojo.Transaction where name = '" + name + "'");
			transactionToReturn = (com.pharmacy.pojo.Transaction) query.uniqueResult();
			
		} catch (Exception exceptionObj) {
			exceptionObj.printStackTrace();
		} finally {
			transanction.commit();
		}
		return transactionToReturn;
	}

	/**
	 * Gets all transactions
	 * 
	 * @return transactions
	 */
	public List<com.pharmacy.pojo.Transaction> getAll() {
		
		List<com.pharmacy.pojo.Transaction> transactionsToReturn = new ArrayList<>();
		
		try {
			// get transactions
			session = HibernateUtil.getSessionFactory().openSession();
			transanction = session.beginTransaction();
			Query query = session.createQuery("from com.pharmacy.pojo.Transaction");
			transactionsToReturn = query.list();
			
		} catch (Exception exceptionObj) {
			exceptionObj.printStackTrace();
		} finally {
			transanction.commit();
		}
		
		return transactionsToReturn;
	}
	

	
	/**
	 * Updates transaction
	 * 
	 * @param transaction
	 */
	public void update(com.pharmacy.pojo.Transaction transaction) {
		try {
			
			// validate that the transaction is not admin
			if(getOneById(transaction.getId()) != null) {
				
				// update transaction
				session = HibernateUtil.getSessionFactory().openSession();
				transanction = session.beginTransaction();
				
				session.update(transaction);
			}
			
			
		} catch (Exception exceptionObj) {
			exceptionObj.printStackTrace();
		} finally {
			transanction.commit();
		}
	}
	

	/**
	 * Deletes transaction by id
	 * 
	 * @param id
	 */
	public void deleteOneById(int id) {
		
		try {
			
			// get transaction
			com.pharmacy.pojo.Transaction transaction = getOneById(id);

			// delete transaction
			session = HibernateUtil.getSessionFactory().openSession();
			transanction = session.beginTransaction();
			session.delete(transaction);
			
		} catch (Exception exceptionObj) {
			exceptionObj.printStackTrace();
		} finally {
			transanction.commit();
		}
	}

}