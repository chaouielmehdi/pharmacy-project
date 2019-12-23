package com.pharmacy.pojo;

import java.util.Date;

import javax.annotation.ManagedBean;
import javax.persistence.Entity;
import javax.persistence.Table;

@ManagedBean
@Entity
@Table(name = "providers")
public class Provider {
	
	/*
	 * (non-Javadoc)
	 * --------------------------------------------------------------------------
	 * Attributes
	 * --------------------------------------------------------------------------
	 */
	
	private int id;
	private String name;
	private String city;
	private Date contractDate;
	
	
	
	/*
	 * (non-Javadoc)
	 * --------------------------------------------------------------------------
	 * Constructors
	 * --------------------------------------------------------------------------
	 */


	public Provider() {
	}

	
	
	/*
	 * (non-Javadoc)
	 * --------------------------------------------------------------------------
	 * Getters & Setters
	 * --------------------------------------------------------------------------
	 */

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}


	public String getName() {
		return name;
	}


	public void setName(String name) {
		this.name = name;
	}


	public String getCity() {
		return city;
	}


	public void setCity(String city) {
		this.city = city;
	}

	public Date getContractDate() {
		return contractDate;
	}

	public void setContractDate(Date contractDate) {
		this.contractDate = contractDate;
	}


	/*
	 * (non-Javadoc)
	 * --------------------------------------------------------------------------
	 * toString
	 * --------------------------------------------------------------------------
	 */

	@Override
	public String toString() {
		return "Provider [id=" + id + ", name=" + name + ", city=" + city + ", contract_date=" + contractDate + "]";
	}


}
