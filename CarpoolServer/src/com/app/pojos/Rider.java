package com.app.pojos;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.MapsId;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "rider_details")
public class Rider {
	
	@Id
	@Column(name = "user_id")
	private int userId;
	@Column(name = "verif_status")
	private boolean verStatus;
	@Column(name = "licence_no", length = 20)
	private String licenceNo;
	
	@MapsId("user_id")
	@OneToOne(cascade=CascadeType.ALL)
	@JoinColumn(name="user_id")
	private UserDetails userDetails;
	
	public Rider() {
	}


	public int getUserId() {
		return userId;
	}


	public void setUserId(int userId) {
		this.userId = userId;
	}


	public boolean isVerStatus() {
		return verStatus;
	}


	public void setVerStatus(boolean verStatus) {
		this.verStatus = verStatus;
	}


	public String getLicenceNo() {
		return licenceNo;
	}


	public void setLicenceNo(String licenceNo) {
		this.licenceNo = licenceNo;
	}
	
	
	public UserDetails getUserDetails() {
		return userDetails;
	}

	public void setUserDetails(UserDetails userDetails) {
		this.userDetails = userDetails;
	}
	
}
