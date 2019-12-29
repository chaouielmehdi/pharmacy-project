package com.pharmacy.dao;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.transform.Transformers;

import com.pharmacy.pojo.Statistic;
import com.pharmacy.util.HibernateUtil;

public class DAOStatistic implements DAOStatisticInterface {
	
	private static Transaction transanction;
	private static Session session;

	/**
	 * Gets statistic
	 * 
	 * @return statistic
	 */
	public Statistic get() {
		
		DAOStatistic daoStatistic = new DAOStatistic();
		
		
		Statistic statisticToReturn = new Statistic(
				daoStatistic.getRevenue(),
				daoStatistic.getProvidersNumber(),
				daoStatistic.getUsersNumber(),
				daoStatistic.getDailySales(),
				daoStatistic.getPurchasesPerProviders()
		);
		
		
		return statisticToReturn;
	}
	

	/**
	 * Gets a statistic element
	 * 
	 * @return statistic
	 */
	public long getRevenue() {
		
		long statisticElement = 0;
		
		try {
			// get statistic
			session = HibernateUtil.getSessionFactory().openSession();
			transanction = session.beginTransaction();
			
	        final DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
	        String currentDate = df.format(new Date());
			
			Query query = session.createQuery("select SUM(t.quantity * m.unitPrice) from Transaction t, Medicine m where t.type = 'buy' and t.date = '" + currentDate + "'");
			statisticElement = (long) query.uniqueResult();
			
		} catch (Exception exceptionObj) {
			exceptionObj.printStackTrace();
		} finally {
			transanction.commit();
		}
		return statisticElement;
	}
	


	/**
	 * Gets a statistic element
	 * 
	 * @return statistic
	 */
	public long getProvidersNumber() {
		
		long statisticElement = 0;
		
		try {
			// get statistic
			session = HibernateUtil.getSessionFactory().openSession();
			transanction = session.beginTransaction();
			Query query = session.createQuery("select COUNT(*) from Provider");
			statisticElement = (long) query.uniqueResult();
			
		} catch (Exception exceptionObj) {
			exceptionObj.printStackTrace();
		} finally {
			transanction.commit();
		}
		return statisticElement;
	}
	


	/**
	 * Gets a statistic element
	 * 
	 * @return statistic
	 */
	public long getUsersNumber() {
		
		long statisticElement = 0;
		
		try {
			// get statistic
			session = HibernateUtil.getSessionFactory().openSession();
			transanction = session.beginTransaction();
			Query query = session.createQuery("select COUNT(*) from User where type=null");
			statisticElement = (long) query.uniqueResult();
			
		} catch (Exception exceptionObj) {
			exceptionObj.printStackTrace();
		} finally {
			transanction.commit();
		}
		return statisticElement;
	}
	
	

	/**
	 * Gets a statistic element
	 * 
	 * @return statistic
	 */
	public Map<String, Long> getPurchasesPerProviders() {
		
		Map<String, Long> purchasesPerProviders = new HashMap<>();
		
		
		try {
			// get statistic
			session = HibernateUtil.getSessionFactory().openSession();
			transanction = session.beginTransaction();
			String queryString = "SELECT count(t.idProvider) as transactionsNumber, p.name as providerName FROM Transaction t, Provider p WHERE p.id = t.idProvider GROUP BY t.idProvider ORDER BY transactionsNumber DESC";
			
			List<List<Object>> permission= session.createQuery(queryString).setResultTransformer(Transformers.TO_LIST).list();
			 
			for(List<Object> x: permission){ 
				purchasesPerProviders.put((String)x.get(1), (Long)x.get(0));
			}
			
		} catch (Exception exceptionObj) {
			exceptionObj.printStackTrace();
		} finally {
			transanction.commit();
		}
		
		return purchasesPerProviders;
	}
	

	/**
	 * Gets a statistic element
	 * 
	 * @return statistic
	 */
	public Map<Date, Long> getDailySales() {
		
		Map<Date, Long> dailySales = new HashMap<>();
		
		
		try {
			// get statistic
			session = HibernateUtil.getSessionFactory().openSession();
			transanction = session.beginTransaction();
			String queryString = "SELECT SUM(quantity), date FROM Transaction GROUP BY date";
			
			List<List<Object>> permission= session.createQuery(queryString).setResultTransformer(Transformers.TO_LIST).list();
			
			for(List<Object> x: permission){ 
				dailySales.put((Date)x.get(1), (Long)x.get(0));
			}
			
		} catch (Exception exceptionObj) {
			exceptionObj.printStackTrace();
		} finally {
			transanction.commit();
		}
		
		return dailySales;
	}
	
}
