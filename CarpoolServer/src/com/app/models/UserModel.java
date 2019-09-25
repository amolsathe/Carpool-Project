package com.app.models;

import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Component;

@Component
public class UserModel {
	int userId;
	String emailId;
	String name;
	String contactNumber;
	String password;
	String gendor;
	@DateTimeFormat(pattern = "yyyy-MM-dd")
    Date dateOfBirth;
    boolean isVerified;
    
    public UserModel() {
		// TODO Auto-generated constructor stub
	}

	public String getEmailId() {
		return emailId;
	}

	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getContactNumber() {
		return contactNumber;
	}

	public void setContactNumber(String contactNumber) {
		this.contactNumber = contactNumber;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getGendor() {
		return gendor;
	}

	public void setGendor(String gendor) {
		this.gendor = gendor;
	}

	public Date getDateOfBirth() {
		return dateOfBirth;
	}

	public void setDateOfBirth(Date dateOfBirth) {
		this.dateOfBirth = dateOfBirth;
	}

	public boolean isVerified() {
		return isVerified;
	}

	public void setVerified(boolean isVerified) {
		this.isVerified = isVerified;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	@Override
	public String toString() {
		return "UserModel [userId=" + userId + ", emailId=" + emailId + ", name=" + name + ", contactNumber="
				+ contactNumber + ", password=" + password + ", gendor=" + gendor + ", dateOfBirth=" + dateOfBirth
				+ ", isVerified=" + isVerified + "]";
	}
	
}
