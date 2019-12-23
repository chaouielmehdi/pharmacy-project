package com.pharmacy.pojo;

import java.util.Date;

import javax.annotation.ManagedBean;
import javax.persistence.Entity;
import javax.persistence.Table;

@ManagedBean
@Entity
@Table(name = "transactions")
public class Transaction {
	
	/*
	 * (non-Javadoc)
	 * --------------------------------------------------------------------------
	 * Attributes
	 * --------------------------------------------------------------------------
	 */
	
	private int id;
	private String type;
	private Date date;
	private int idMedicine;
	private int idProvider;
	private int idUser;
	private int quantity;
	

	/*
	 * (non-Javadoc)
	 * --------------------------------------------------------------------------
	 * Constructors
	 * --------------------------------------------------------------------------
	 */

	public Transaction() {
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


	public String getType() {
		return type;
	}


	public void setType(String type) {
		this.type = type;
	}


	public Date getDate() {
		return date;
	}


	public void setDate(Date date) {
		this.date = date;
	}


	public int getIdMedicine() {
		return idMedicine;
	}


	public void setIdMedicine(int idMedicine) {
		this.idMedicine = idMedicine;
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

	public int getIdUser() {
		return idUser;
	}

	public void setIdUser(int idUser) {
		this.idUser = idUser;
	}
	
	
	
	/*
	 * (non-Javadoc)
	 * --------------------------------------------------------------------------
	 * toString
	 * --------------------------------------------------------------------------
	 */

	@Override
	public String toString() {
		return "Transaction [id=" + id + ", type=" + type + ", date=" + date + ", idMedicine=" + idMedicine
				+ ", idProvider=" + idProvider + ", idUser=" + idUser + ", quantity=" + quantity + "]";
	}

	

}
