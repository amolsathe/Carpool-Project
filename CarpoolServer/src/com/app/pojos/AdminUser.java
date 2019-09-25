package com.app.pojos;

import java.util.Date;
import javax.persistence.*;
import javax.persistence.Entity;
import javax.persistence.Table;

import org.hibernate.annotations.*;


@Entity
@Table(name = "admin_users")
public class AdminUser {
	
	private int adminUserId;
	private String emailId;
	private String password;
	//private UserDetails user;
	private Date regDate = new java.sql.Date(new java.util.Date().getTime());
	
	public AdminUser() 
	{	}
	
	
	public AdminUser(String emailId, String password) {
		this.emailId = emailId;
		this.password = password;
	}


	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "admin_id")  
	public int getAdminUserId() {
		return adminUserId;
	}

	public void setAdminUserId(int adminUserId) {
		this.adminUserId = adminUserId;
	}

	@Column(name = "email_id",length=45)
	public String getEmailId() {
		return emailId;
	}

	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}
	@Column(length=30)
	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	@Column(name = "reg_date", columnDefinition = "datetime default current_timestamp")
	@Generated(GenerationTime.ALWAYS)
	@Temporal(javax.persistence.TemporalType.DATE)
	public Date getRegDate() {
		return regDate;
	}

	public void setRegDate(Date regDate) {
		this.regDate = regDate;
	}
}
