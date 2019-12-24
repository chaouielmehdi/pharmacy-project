package com.pharmacy.dao;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.pharmacy.pojo.Medicine;
import com.pharmacy.util.HibernateUtil;

public class DAOMedicine implements DAOMedicineInterface {
	
	private static Transaction transanction;
	private static Session session;
	
	/**
	 * Saves medicine
	 * 
	 * @param medicine
	 */
	public void save(Medicine medicine) {
		try {
			
			// save medicine
			session = HibernateUtil.getSessionFactory().openSession();
			transanction = session.beginTransaction();
			session.save(medicine);
			
		} catch (Exception exceptionObj) {
			exceptionObj.printStackTrace();
		} finally {
			transanction.commit();
		}
	}
	

	/**
	 * Gets medicine by id
	 * 
	 * @param id
	 * @return medicine by id (or null)
	 */
	public Medicine getOneById(int id) {
		
		Medicine medicineToReturn = null;
		
		try {

			// get medicine
			session = HibernateUtil.getSessionFactory().openSession();
			transanction = session.beginTransaction();
			Query query = session.createQuery("from Medicine where id = " + id);
			medicineToReturn = (Medicine) query.uniqueResult();
			
		} catch (Exception exceptionObj) {
			exceptionObj.printStackTrace();
		} finally {
			transanction.commit();
		}
		return medicineToReturn;
	}

	/**
	 * Gets medicine by name
	 * 
	 * @param id
	 * @return medicine by id (or null)
	 */
	public Medicine getOneByName(String name) {
		
		Medicine medicineToReturn = null;
		
		try {
			
			// get medicine
			session = HibernateUtil.getSessionFactory().openSession();
			transanction = session.beginTransaction();
			Query query = session.createQuery("from Medicine where name = '" + name + "'");
			medicineToReturn = (Medicine) query.uniqueResult();
			
		} catch (Exception exceptionObj) {
			exceptionObj.printStackTrace();
		} finally {
			transanction.commit();
		}
		return medicineToReturn;
	}

	/**
	 * Gets all medicines
	 * 
	 * @return medicines
	 */
	public List<Medicine> getAll() {
		
		List<Medicine> medicinesToReturn = new ArrayList<>();
		
		try {
			// get medicines
			session = HibernateUtil.getSessionFactory().openSession();
			transanction = session.beginTransaction();
			Query query = session.createQuery("from Medicine");
			medicinesToReturn = query.list();
			
		} catch (Exception exceptionObj) {
			exceptionObj.printStackTrace();
		} finally {
			transanction.commit();
		}
		
		return medicinesToReturn;
	}
	

	
	/**
	 * Updates medicine
	 * 
	 * @param medicine
	 */
	public void update(Medicine medicine) {
		try {
			
			// validate that the medicine is not admin
			if(getOneById(medicine.getId()) != null) {
				
				// update medicine
				session = HibernateUtil.getSessionFactory().openSession();
				transanction = session.beginTransaction();
				
				session.update(medicine);
			}
			
		} catch (Exception exceptionObj) {
			exceptionObj.printStackTrace();
		} finally {
			transanction.commit();
		}
	}
	

	/**
	 * Deletes medicine by id
	 * 
	 * @param id
	 */
	public void deleteOneById(int id) {
		
		try {
			
			// get medicine
			Medicine medicine = getOneById(id);

			// delete medicine
			session = HibernateUtil.getSessionFactory().openSession();
			transanction = session.beginTransaction();
			session.delete(medicine);
			
		} catch (Exception exceptionObj) {
			exceptionObj.printStackTrace();
		} finally {
			transanction.commit();
		}
	}

}