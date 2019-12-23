package com.pharmacy.dao;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.pharmacy.pojo.User;
import com.pharmacy.util.HibernateUtil;

public class DAOUser implements DAOUserInterface {

	private static Transaction transanction;
	private static Session session;
	
	/**
	 * Saves user
	 * 
	 * @param user
	 */
	public void save(User user) {
		try {

			// make sure that the user saved is not admin
			user.setType(null);
			
			// save user
			session = HibernateUtil.getSessionFactory().openSession();
			transanction = session.beginTransaction();
			session.save(user);
			
		} catch (Exception exceptionObj) {
			exceptionObj.printStackTrace();
		} finally {
			transanction.commit();
		}
	}
	

	/**
	 * Gets user by id
	 * 
	 * @param id
	 * @return user by id (or null)
	 */
	public User getOneById(int id) {
		
		User userToReturn = null;
		
		try {

			// get user
			session = HibernateUtil.getSessionFactory().openSession();
			transanction = session.beginTransaction();
			Query query = session.createQuery("from User where id = " + id);
			userToReturn = (User) query.uniqueResult();
			
		} catch (Exception exceptionObj) {
			exceptionObj.printStackTrace();
		} finally {
			transanction.commit();
		}
		return userToReturn;
	}

	/**
	 * Gets user by username
	 * 
	 * @param id
	 * @return user by id (or null)
	 */
	public User getOneByUsername(String username) {
		
		User userToReturn = null;
		
		try {
			
			// get user
			session = HibernateUtil.getSessionFactory().openSession();
			transanction = session.beginTransaction();
			Query query = session.createQuery("from User where username = '" + username + "'");
			userToReturn = (User) query.uniqueResult();
			
		} catch (Exception exceptionObj) {
			exceptionObj.printStackTrace();
		} finally {
			transanction.commit();
		}
		return userToReturn;
	}

	/**
	 * Gets user by username & password
	 * 
	 * @param id
	 * @return user by id (or null)
	 */
	public User getOneByUsernameAndPassword(String username, String password) {
		
		User userToReturn = null;
		
		try {
			// get user
			session = HibernateUtil.getSessionFactory().openSession();
			transanction = session.beginTransaction();
			Query query = session.createQuery("from User where username = '" + username + "' and password = '" + password + "'");
			userToReturn = (User) query.uniqueResult();
		} catch (Exception exceptionObj) {
			exceptionObj.printStackTrace();
		} finally {
			transanction.commit();
		}
		return userToReturn;
	}
	
	

	/**
	 * Gets all users
	 * 
	 * @return users
	 */
	public List<User> getAll() {
		
		List<User> usersToReturn = new ArrayList<>();
		
		try {

			// get users
			session = HibernateUtil.getSessionFactory().openSession();
			transanction = session.beginTransaction();
			Query query = session.createQuery("from User where type = null");
			usersToReturn = query.list();
			
		} catch (Exception exceptionObj) {
			exceptionObj.printStackTrace();
		} finally {
			transanction.commit();
		}
		
		return usersToReturn;
	}
	

	/**
	 * Gets admin by id
	 * 
	 * @param id
	 * @return admin by id (or null)
	 */
	public User getOneAdminById(int id) {
		
		User userToReturn = null;
		
		try {

			// get users
			session = HibernateUtil.getSessionFactory().openSession();
			transanction = session.beginTransaction();
			Query query = session.createQuery("from User where id = " + id + " and type = 'admin'");
			userToReturn = (User) query.uniqueResult();
			
		} catch (Exception exceptionObj) {
			exceptionObj.printStackTrace();
		} finally {
			transanction.commit();
		}
		return userToReturn;
	}

	
	/**
	 * Updates user
	 * 
	 * @param user
	 */
	public void update(User user) {
		try {
			
			// validate that the user is not admin
			if(getOneById(user.getId()) != null) {
				
				// update user
				session = HibernateUtil.getSessionFactory().openSession();
				transanction = session.beginTransaction();
				
				session.update(user);
			}
			
			
		} catch (Exception exceptionObj) {
			exceptionObj.printStackTrace();
		} finally {
			transanction.commit();
		}
	}
	

	/**
	 * Deletes user by id
	 * 
	 * @param id
	 */
	public void deleteOneById(int id) {
		
		try {
			
			// get user
			User user = getOneById(id);

			// delete user
			session = HibernateUtil.getSessionFactory().openSession();
			transanction = session.beginTransaction();
			session.delete(user);
			
		} catch (Exception exceptionObj) {
			exceptionObj.printStackTrace();
		} finally {
			transanction.commit();
		}
	}

}