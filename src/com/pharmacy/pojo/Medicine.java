package com.pharmacy.pojo;

import java.util.Date;

import javax.annotation.ManagedBean;
import javax.persistence.Entity;
import javax.persistence.Table;

@ManagedBean
@Entity
@Table(name = "medicines")
public class Medicine {
	
	/*
	 * (non-Javadoc)
	 * --------------------------------------------------------------------------
	 * Attributes
	 * --------------------------------------------------------------------------
	 */
	
	private int id;
	private String name;
	private Date expirationDate;
	private int unitPrice;
	private int idProvider;
	private int quantity;
	
	
	/*
	 * (non-Javadoc)
	 * --------------------------------------------------------------------------
	 * Constructors
	 * --------------------------------------------------------------------------
	 */

	public Medicine() {
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

	public Date getExpirationDate() {
		return expirationDate;
	}

	public void setExpirationDate(Date expirationDate) {
		this.expirationDate = expirationDate;
	}

	public int getUnitPrice() {
		return unitPrice;
	}

	public void setUnitPrice(int unitPrice) {
		this.unitPrice = unitPrice;
	}

	public int getIdProvider() {
		return idProvider;
	}

	public void setIdProvider(int idProvider) {
		this.idProvider = idProvider;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}


	
	/*
	 * (non-Javadoc)
	 * --------------------------------------------------------------------------
	 * toString
	 * --------------------------------------------------------------------------
	 */

	@Override
	public String toString() {
		return "Medicine [id=" + id + ", name=" + name + ", expirationDate=" + expirationDate + ", unitPrice="
				+ unitPrice + ", idProvider=" + idProvider + ", quantity=" + quantity + "]";
	}
	


}
