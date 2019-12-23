package com.pharmacy.dao;

import java.util.ArrayList;
import java.util.List;
import java.util.TimeZone;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.pharmacy.pojo.Provider;
import com.pharmacy.util.DateHandler;
import com.pharmacy.util.HibernateUtil;

public class DAOProvider implements DAOProviderInterface {

	private static Transaction transanction;
	private static Session session;

	/**
	 * Saves provider
	 * 
	 * @param provider
	 */
	public void save(Provider provider) {
		try {

			// save provider
			session = HibernateUtil.getSessionFactory().openSession();
			transanction = session.beginTransaction();
			session.save(provider);
			
		} catch (Exception exceptionObj) {
			exceptionObj.printStackTrace();
		} finally {
			transanction.commit();
		}
	}
	

	/**
	 * Gets provider by id
	 * 
	 * @param id
	 * @return provider by id (or null)
	 */
	public Provider getOneById(int id) {
		
		Provider providerToReturn = null;
		
		try {

			// get provider
			session = HibernateUtil.getSessionFactory().openSession();
			transanction = session.beginTransaction();
			Query query = session.createQuery("from Provider where id = " + id);
			providerToReturn = (Provider) query.uniqueResult();
			
		} catch (Exception exceptionObj) {
			exceptionObj.printStackTrace();
		} finally {
			transanction.commit();
		}
		return providerToReturn;
	}

	/**
	 * Gets provider by name
	 * 
	 * @param id
	 * @return provider by id (or null)
	 */
	public Provider getOneByName(String name) {
		
		Provider providerToReturn = null;
		
		try {
			
			// get provider
			session = HibernateUtil.getSessionFactory().openSession();
			transanction = session.beginTransaction();
			Query query = session.createQuery("from Provider where name = '" + name + "'");
			providerToReturn = (Provider) query.uniqueResult();
			
		} catch (Exception exceptionObj) {
			exceptionObj.printStackTrace();
		} finally {
			transanction.commit();
		}
		return providerToReturn;
	}

	/**
	 * Gets all providers
	 * 
	 * @return providers
	 */
	public List<Provider> getAll() {
		
		List<Provider> providersToReturn = new ArrayList<>();
		
		try {

			// get providers
			session = HibernateUtil.getSessionFactory().openSession();
			transanction = session.beginTransaction();
			Query query = session.createQuery("from Provider");
			providersToReturn = query.list();
			
		} catch (Exception exceptionObj) {
			exceptionObj.printStackTrace();
		} finally {
			transanction.commit();
		}
		
		return providersToReturn;
	}
	

	/**
	 * Updates provider
	 * 
	 * @param provider
	 */
	public void update(Provider provider) {
		try {
			
			// validate that the provider is not admin
			if(getOneById(provider.getId()) != null) {
				
				// update provider
				session = HibernateUtil.getSessionFactory().openSession();
				transanction = session.beginTransaction();
				
				session.update(provider);
			}
			
		} catch (Exception exceptionObj) {
			exceptionObj.printStackTrace();
		} finally {
			transanction.commit();
		}
	}
	

	/**
	 * Deletes provider by id
	 * 
	 * @param id
	 */
	public void deleteOneById(int id) {
		
		try {
			
			// get provider
			Provider provider = getOneById(id);

			// delete provider
			session = HibernateUtil.getSessionFactory().openSession();
			transanction = session.beginTransaction();
			session.delete(provider);
			
		} catch (Exception exceptionObj) {
			exceptionObj.printStackTrace();
		} finally {
			transanction.commit();
		}
	}

}