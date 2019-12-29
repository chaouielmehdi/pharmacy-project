package com.pharmacy.pojo;

import java.util.Date;
import java.util.Map;

import javax.annotation.ManagedBean;
import javax.persistence.Entity;
import javax.persistence.Table;

public class Statistic {
	
	/*
	 * (non-Javadoc)
	 * --------------------------------------------------------------------------
	 * Attributes
	 * --------------------------------------------------------------------------
	 */

	private long revenue;
	private long providersNumber;
	private long usersNumber;
	private Map<Date, Long> dailySales;
	private Map<String, Long> purchasesPerProviders;

	
	/*
	 * (non-Javadoc)
	 * --------------------------------------------------------------------------
	 * Constructors
	 * --------------------------------------------------------------------------
	 */

	public Statistic() {
		
	}


	public Statistic(long revenue, long providersNumber, long usersNumber, Map<Date, Long> dailySales,
			Map<String, Long> purchasesPerProviders) {
		super();
		this.revenue = revenue;
		this.providersNumber = providersNumber;
		this.usersNumber = usersNumber;
		this.dailySales = dailySales;
		this.purchasesPerProviders = purchasesPerProviders;
	}


	/*
	 * (non-Javadoc)
	 * --------------------------------------------------------------------------
	 * Getters & Setters
	 * --------------------------------------------------------------------------
	 */

	public long getRevenue() {
		return revenue;
	}

	public void setRevenue(int revenue) {
		this.revenue = revenue;
	}

	public long getProvidersNumber() {
		return providersNumber;
	}

	public void setProvidersNumber(int providersNumber) {
		this.providersNumber = providersNumber;
	}

	public long getUsersNumber() {
		return usersNumber;
	}

	public void setUsersNumber(int usersNumber) {
		this.usersNumber = usersNumber;
	}

	public Map<Date, Long> getDailySales() {
		return dailySales;
	}

	public void setDailySales(Map<Date, Long> dailySales) {
		this.dailySales = dailySales;
	}

	public Map<String, Long> getPurchasesPerProviders() {
		return purchasesPerProviders;
	}

	public void setPurchasesPerProviders(Map<String, Long> purchasesPerProviders) {
		this.purchasesPerProviders = purchasesPerProviders;
	}


	/*
	 * (non-Javadoc)
	 * --------------------------------------------------------------------------
	 * toString
	 * --------------------------------------------------------------------------
	 */

	@Override
	public String toString() {
		return "Statistic [revenue=" + revenue + ", providersNumber=" + providersNumber + ", usersNumber=" + usersNumber
				+ ", dailySales=" + dailySales + ", purchasesPerProviders=" + purchasesPerProviders + "]";
	}
	
}
