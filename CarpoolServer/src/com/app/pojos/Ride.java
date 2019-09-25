package com.app.pojos;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "rides")
public class Ride {
	private int rideId;
	private String origin;
	private String destination;
	private float distance;
	private float originLat;
	private float originLng;
	private float destLat;
	private float destLng;
	private Date date;
	private String rideTime;
	private int availableSeats;
	private int fare;
	private int userId;
	private String approxTime;
	private List<BookedRide> bookedRides;
	
	private UserDetails userDetails;
	
	@Column(name = "origin_lat")
	public float getOriginLat() {
		return originLat;
	}


	public void setOriginLat(float originLat) {
		this.originLat = originLat;
	}

	@Column(name = "origin_lng")
	public float getOriginLng() {
		return originLng;
	}


	public void setOriginLng(float originLng) {
		this.originLng = originLng;
	}

	@Column(name = "dest_lat")
	public float getDestLat() {
		return destLat;
	}


	public void setDestLat(float destLat) {
		this.destLat = destLat;
	}

	@Column(name = "dest_lng")
	public float getDestLng() {
		return destLng;
	}


	public void setDestLng(float destLng) {
		this.destLng = destLng;
	}

	@Column(name = "ride_time",length = 10)
	public String getRideTime() {
		return rideTime;
	}


	public void setRideTime(String rideTime) {
		this.rideTime = rideTime;
	}

	@Column(name = "approx_time", length = 40)
	public String getApproxTime() {
		return approxTime;
	}


	public void setApproxTime(String approxTime) {
		this.approxTime = approxTime;
	}

	public Ride() {
	}
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ride_id")
	public int getRideId() {
		return rideId;
	}

	public void setRideId(int rideId) {
		this.rideId = rideId;
	}
	
	@Column(length = 100)
	public String getOrigin() {
		return origin;
	}

	public void setOrigin(String origin) {
		this.origin = origin;
	}
	@Column(length = 100)
	public String getDestination() {
		return destination;
	}
	
	public void setDestination(String destination) {
		this.destination = destination;
	}
	
	public float getDistance() {
		return distance;
	}

	public void setDistance(float distance) {
		this.distance = distance;
	}

	@DateTimeFormat(pattern = "yyyy-MM-dd")
	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	@Column(name = "available_seats")
	public int getAvailableSeats() {
		return availableSeats;
	}

	public void setAvailableSeats(int availableSeats) {
		this.availableSeats = availableSeats;
	}

	public int getFare() {
		return fare;
	}

	public void setFare(int fare) {
		this.fare = fare;
	}
	
	@MapsId("user_id")
	@ManyToOne()
	@JoinColumn(name = "user_id")
	@JsonIgnore
	public UserDetails getUserDetails() {
		return userDetails;
	}

	public void setUserDetails(UserDetails userDetails) {
		this.userDetails = userDetails;
	}
	@MapsId("book_id")
	@OneToMany(mappedBy = "ride",cascade = CascadeType.ALL)
	@JsonIgnore
	public List<BookedRide> getBookedRides() {
		return bookedRides;
	}


	public void setBookedRides(List<BookedRide> bookedRides) {
		this.bookedRides = bookedRides;
	}

	@Column(name = "user_id")
	public int getUserId() {
		return userId;
	}


	public void setUserId(int userId) {
		this.userId = userId;
	}


	@Override
	public String toString() {
		return "Ride [rideId=" + rideId + ", origin=" + origin + ", destination=" + destination + ", distance="
				+ distance + ", originLat=" + originLat + ", originLng=" + originLng + ", destLat=" + destLat
				+ ", destLng=" + destLng + ", date=" + date + ", rideTime=" + rideTime + ", availableSeats="
				+ availableSeats + ", fare=" + fare + ", userId=" + userId + ", approxTime=" + approxTime
				+ ", bookedRides=" + bookedRides + ", userDetails=" + userDetails + "]";
	}
	
	
	
}
