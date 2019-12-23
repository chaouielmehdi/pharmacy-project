package com.pharmacy.pojo;

import javax.annotation.ManagedBean;
import javax.persistence.Entity;
import javax.persistence.Table;

@ManagedBean
@Entity
@Table(name = "users")
public class User {
	
	/*
	 * (non-Javadoc)
	 * --------------------------------------------------------------------------
	 * Attributes
	 * --------------------------------------------------------------------------
	 */

	private int id;
	private String username;
	private String password;
	private String type;
	private String firstName;
	private String lastName;
	private String cin;
	private String phone;
	private String description;


	/*
	 * (non-Javadoc)
	 * --------------------------------------------------------------------------
	 * Constructors
	 * --------------------------------------------------------------------------
	 */

	public User() {
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

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getCin() {
		return cin;
	}

	public void setCin(String cin) {
		this.cin = cin;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}
	
	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	/*
	 * (non-Javadoc)
	 * --------------------------------------------------------------------------
	 * toString
	 * --------------------------------------------------------------------------
	 */

	@Override
	public String toString() {
		return "User [id=" + id + ", username=" + username + ", password=" + password + ", type=" + type
				+ ", firstName=" + firstName + ", lastName=" + lastName + ", cin=" + cin + ", phone=" + phone
				+ ", description=" + description + "]";
	}

}
