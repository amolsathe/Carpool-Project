package com.app.pojos;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.MapsId;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "car")
public class Car {
	private int carId;
	private boolean chargingPort;
	private boolean ac;
	private String vehicleNo;
	private boolean insurance;
	private String image1;
	private String image2;
	private String carModel;
	private int totalSeats;
	private UserDetails userDetails;
	private int userId;
	
	public Car() {
		// TODO Auto-generated constructor stub
	}
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "car_id")
	public int getCarId() {
		return carId;
	}

	public void setCarId(int carId) {
		this.carId = carId;
	}
	@Column(name = "charging_port")
	public boolean isChargingPort() {
		return chargingPort;
	}

	public void setChargingPort(boolean chargingPort) {
		this.chargingPort = chargingPort;
	}
	@Column(name = "ac")
	public boolean isAc() {
		return ac;
	}

	public void setAc(boolean aC) {
		ac = aC;
	}
	@Column(name = "vehical_number",length = 15)
	public String getVehicleNo() {
		return vehicleNo;
	}

	public void setVehicleNo(String vehicleNo) {
		this.vehicleNo = vehicleNo;
	}
	@Column(name = "insurance")
	public boolean isInsurance() {
		return insurance;
	}

	public void setInsurance(boolean insurance) {
		this.insurance = insurance;
	}
	@Column(name = "image1", length = 45)
	public String getImage1() {
		return image1;
	}

	public void setImage1(String image1) {
		this.image1 = image1;
	}
	@Column(name = "image2", length = 45)
	public String getImage2() {
		return image2;
	}

	public void setImage2(String image2) {
		this.image2 = image2;
	}
	@Column(name = "car_model", length = 45)
	public String getCarModel() {
		return carModel;
	}

	public void setCarModel(String carModel) {
		this.carModel = carModel;
	}
	@Column(name = "total_seats")
	public int getTotalSeats() {
		return totalSeats;
	}

	public void setTotalSeats(int totalSeats) {
		this.totalSeats = totalSeats;
	}
	
	@MapsId("user_id")
	@OneToOne(cascade=CascadeType.ALL)
	@JoinColumn(name="user_id")
	@JsonIgnore
	public UserDetails getUserDetails() {
		return userDetails;
	}
	public void setUserDetails(UserDetails userDetails) {
		this.userDetails = userDetails;
	}
	@Column(name = "user_id")
	public int getUserId() {
		return userId;
	}
	public void setUserId(int userId) {
		this.userId = userId;
	}
}
