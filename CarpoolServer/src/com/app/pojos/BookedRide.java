package com.app.pojos;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.Table;
import javax.persistence.Temporal;

import org.hibernate.annotations.Generated;
import org.hibernate.annotations.GenerationTime;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "booked_rides")
public class BookedRide {
	private int bookId ;
	private int rideId ;
	private int userId ;
	private int seatBooked;
	private Date bookingDate;
	private UserDetails userDetails;
	private Ride ride;
	
	public BookedRide() {
		// TODO Auto-generated constructor stub
	}

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "book_id")
	public int getBookId() {
		return bookId;
	}

	public void setBookId(int bookId) {
		this.bookId = bookId;
	}
	@Column(name = "ride_id")
	public int getRideId() {
		return rideId;
	}

	public void setRideId(int rideId) {
		this.rideId = rideId;
	}
	@Column(name = "user_id")
	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}
	@Column(name = "seat_booked")
	public int getSeatBooked() {
		return seatBooked;
	}

	public void setSeatBooked(int seatBooked) {
		this.seatBooked = seatBooked;
	}
	@Column(name = "booking_date", columnDefinition = "datetime default current_timestamp")
	@Generated(GenerationTime.ALWAYS)
	@Temporal(javax.persistence.TemporalType.DATE)
	public Date getBookingTime() {
		return bookingDate;
	}

	public void setBookingTime(Date bookingTime) {
		this.bookingDate = bookingTime;
	}
	@MapsId("ride_id")
	@ManyToOne
	@JoinColumn(name = "ride_id")
	public Ride getRide() {
		return ride;
	}

	public void setRide(Ride ride) {
		this.ride = ride;
	}
	@MapsId("user_id")
	@ManyToOne
	@JsonIgnore
	@JoinColumn(name = "user_id")
	public UserDetails getUserDetails() {
		return userDetails;
	}

	public void setUserDetails(UserDetails userDetails) {
		this.userDetails = userDetails;
	}

	@Override
	public String toString() {
		return "BookedRide [bookId=" + bookId + ", rideId=" + rideId + ", userId=" + userId + ", seatBooked="
				+ seatBooked + ", bookingDate=" + bookingDate + ", userDetails=" + userDetails + ", ride=" + ride + "]";
	}
	
	
}
