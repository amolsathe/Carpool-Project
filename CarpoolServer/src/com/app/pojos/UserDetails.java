package com.app.pojos;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.*;

import org.hibernate.annotations.Generated;
import org.hibernate.annotations.GenerationTime;
import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonIgnore;


//enum Gendor
//{
//	MALE, FEMALE, TRANSGENDOR
//}

@Entity
@Table(name = "user_details")
public class UserDetails {
	private int userId;
	private String emailId;
	private String name;
	private String contactNumber;
	private String password;
	private Gendor gendor;
	private Date regDate = new java.sql.Date(new java.util.Date().getTime());
	private Date dateOfBirth;
	private boolean isVerified;
	
	private List<Ride> ride=new ArrayList<Ride>();
	
	private Rider rider=new Rider();
	
	private List<BookedRide> bookedRides=new ArrayList<BookedRide>();
	
	private Car car=new Car();
	
	public UserDetails() {
		
	}
	
	
	public UserDetails(String emailId, String name, String contactNumber, String password, String gendor,
			Date dateOfBirth, boolean isVerified) {
		this.emailId = emailId;
		this.name = name;
		this.contactNumber = contactNumber;
		this.password = password;
		this.gendor = Gendor.valueOf(gendor.toUpperCase());
		this.dateOfBirth = dateOfBirth;
		this.isVerified = isVerified;
	}


	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "user_id")
	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}
	@Column(name = "email_id",unique = true ,length = 45)
	public String getEmailId() {
		return emailId;
	}

	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}
	@Column(length = 80)
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	@Column(name = "contact_number", length = 16, unique = true)
	public String getContactNumber() {
		return contactNumber;
	}

	public void setContactNumber(String contactNumber) {
		this.contactNumber = contactNumber;
	}
	
	@Column(length = 30)
	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	
	@Enumerated(EnumType.STRING)
	@Column(length = 15)
	public Gendor getGendor() {
		return gendor;
	}

	public void setGendor(Gendor gendor) {
		this.gendor = gendor;
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

	@Column(name = "dob")
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	@Temporal(javax.persistence.TemporalType.DATE)
	public Date getDateOfBirth() {
		return dateOfBirth;
	}

	public void setDateOfBirth(Date dateOfBirth) {
		this.dateOfBirth = dateOfBirth;
	}

	public boolean isVerified() {
		return isVerified;
	}
	
	@Column(name = "is_verified")
	public void setVerified(boolean isVerified) {
		this.isVerified = isVerified;
	}
	@OneToOne(mappedBy = "userDetails", cascade = CascadeType.ALL)
	@JsonIgnore
	public Rider getRider() {
		return rider;
	}

	public void setRider(Rider rider) {
		this.rider = rider;
	}
	@OneToMany(mappedBy = "userDetails", cascade = CascadeType.ALL)
	@JsonIgnore
	public List<Ride> getRide() {
		return ride;
	}

	public void setRide(List<Ride> ride) {
		this.ride = ride;
	}
	@OneToMany(mappedBy = "userDetails",cascade = CascadeType.ALL)
	@JsonIgnore
	public List<BookedRide> getBookedRides() {
		return bookedRides;
	}

	public void setBookedRides(List<BookedRide> bookedRides) {
		this.bookedRides = bookedRides;
	}
	
	@OneToOne(mappedBy = "userDetails", cascade = CascadeType.ALL)
	public Car getCar() {
		return car;
	}


	public void setCar(Car car) {
		this.car = car;
	}

	
}
