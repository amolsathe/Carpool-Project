package com.app.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dao.UserDao;
import com.app.models.UserModel;
import com.app.pojos.BookedRide;
import com.app.pojos.Car;
import com.app.pojos.Ride;
import com.app.pojos.Rider;
import com.app.pojos.UserDetails;

//angHost-http://localhost:4200

//@CrossOrigin(origins = "http://localhost:4200", allowedHeaders="*")
@RestController
@RequestMapping("/user")
public class UserController {
	@Autowired
	private UserDao dao;
	
	@Autowired
	private JavaMailSender mailSender;
	
	@PostMapping("/login")
	public ResponseEntity<Result> userLogin(@RequestBody Login user)
	{
		try {
			Integer userId=this.dao.validateUser(user.getEmailId(), user.getPassword());
			return new ResponseEntity<Result>(new Result("success",userId),HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<Result>(new Result("failure"),HttpStatus.OK);
		}
	}
	@PostMapping("/getUId")
	public ResponseEntity<Result> getUserID(@RequestBody Login user)
	{
		try {
			Integer userId=this.dao.getUserId(user.getEmailId());
			return new ResponseEntity<Result>(new Result("success",userId),HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<Result>(new Result("failure"),HttpStatus.OK);
		}
	}
	@PostMapping("/register")
	public ResponseEntity<Result> registerUser(@RequestBody UserModel usr)
	{
//		System.out.println("Date :"+ usr.dateOfBirth);
//		return new ResponseEntity<Result>(new Result("failure"),HttpStatus.OK);
		UserDetails newUser = new UserDetails(usr.getEmailId(), usr.getName(), usr.getContactNumber(), usr.getPassword(), usr.getGendor(),
				usr.getDateOfBirth(), usr.isVerified());
		try {
			if (this.dao.registerUser(newUser)) {
				String msg="Welcome to rideShare Carpool Service !";
				SimpleMailMessage mailMessage = new SimpleMailMessage();
				mailMessage.setTo(usr.getEmailId());
				mailMessage.setSubject("Registration Successfull !!");
				mailMessage.setText(msg);
				try
				{
					mailSender.send(mailMessage);
				}
				catch (MailException e) 
				{
					System.out.println("inside mail exception");
					e.printStackTrace();
				}
				return new ResponseEntity<Result>(new Result("success"),HttpStatus.OK);
			} 
			else {
				return new ResponseEntity<Result>(new Result("failure"),HttpStatus.OK);
			}
			
		} catch (AssertionError e) {
			return new ResponseEntity<Result>(new Result("duplicate"),HttpStatus.OK);
		}catch (Exception e) {
			return new ResponseEntity<Result>(new Result("failure"),HttpStatus.OK);
		}
	}
	@GetMapping("/get/{id}")
	public ResponseEntity<UserDetails> getSingleUser(@PathVariable int id){
		try {
			UserDetails user=this.dao.getSingleUser(id);
			return new ResponseEntity<UserDetails>(user,HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.OK);
		}
	}
	@PostMapping("/update")
	public ResponseEntity<Result> updateUser(@RequestBody UserModel usr){
		try {
//			UserDetails newUser = new UserDetails(usr.getEmailId(), usr.getName(), usr.getContactNumber(), usr.getPassword(), usr.getGendor(),
//					usr.getDateOfBirth(), usr.isVerified());
//			newUser.setUserId(usr.getUserId());
			System.out.println(usr);
			if ( this.dao.updateUser(usr)) {
				return new ResponseEntity<Result>(new Result("success"),HttpStatus.OK);
			}
			else 
				return new ResponseEntity<Result>(new Result("failure"),HttpStatus.OK);
			
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(null, HttpStatus.OK);
		}
	}
	
	@GetMapping("/status/{id}")
	public ResponseEntity<?> getUserStatus(@PathVariable int id){
		try {
			int status=this.dao.getUserStatus(id);
			return new ResponseEntity<Result>(new Result("success", status),HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(new Result("failure", 0), HttpStatus.OK);
		}
	}
	@PostMapping("/addRider/{id}")
	public ResponseEntity<?> addRider(@PathVariable int id,@RequestBody Rider rider){
		try {
			System.out.println(rider.getLicenceNo());
			String status=this.dao.addRider(id, rider);
			return new ResponseEntity<Result>(new Result(status),HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(new Result("failure"), HttpStatus.OK);
		}
	}
	@PostMapping("/addCar/{id}")
	public ResponseEntity<?> addCar(@PathVariable int id,@RequestBody Car car){
		try {
			System.out.println(car.getCarModel());
			String status=this.dao.addCar(id, car);
			return new ResponseEntity<Result>(new Result(status),HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(new Result("failure"), HttpStatus.OK);
		}
	}
	@GetMapping("/getCar/{id}")
	public ResponseEntity<?> getCarDetails(@PathVariable int id){
		try {
			Car car=this.dao.getCarDetails(id);
			return new ResponseEntity<Result>(new Result("success", car),HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(new Result("failure", 0), HttpStatus.OK);
		}
	}
	@PostMapping("/addRide/{id}")
	public ResponseEntity<?> addNewRide(@PathVariable int id, @RequestBody Ride ride){
		try {
			String status=this.dao.addNewRide(id, ride);
			return new ResponseEntity<Result>(new Result(status),HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(new Result("failure", 0), HttpStatus.OK);
		}
	}
	@PostMapping("/findRide")
	public ResponseEntity<?> findRide(@RequestBody Ride ride){
		try {
			//System.out.println(ride);
			List<Ride> rides=this.dao.findRide(ride);
			return new ResponseEntity<Result>(new Result("success", rides),HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(new Result("failure", 0), HttpStatus.OK);
		}
	}
	@PostMapping("/bookRide")
	public ResponseEntity<?> bookRide(@RequestBody BookedRide bRide){
		try {
			String status=this.dao.bookRide(bRide);
			return new ResponseEntity<Result>(new Result(status),HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(new Result("failure", 0), HttpStatus.OK);
		}
	}
	@GetMapping("/getBooking/{id}")
	public ResponseEntity<?> getUserBooking(@PathVariable int id){
		try {
			System.out.println(id);
			List<BookedRide> bRides=this.dao.getUserBookings(id);
			return new ResponseEntity<Result>(new Result("success",bRides),HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(new Result("failure", 0), HttpStatus.OK);
		}
	}
	@GetMapping("/getRides/{id}")
	public ResponseEntity<?> getOfferedRides(@PathVariable int id){
		try {
			List<Ride> allRides=this.dao.getRides(id);
			return new ResponseEntity<Result>(new Result("success",allRides),HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(new Result("failure", 0), HttpStatus.OK);
		}
	}
	@GetMapping("/cancelBooking/{id}")
	public ResponseEntity<?> cancelBooking(@PathVariable int id){
		try {
			System.out.println(id);
			String status=this.dao.cancelBooking(id);
			return new ResponseEntity<Result>(new Result(status),HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(new Result("failure", 0), HttpStatus.OK);
		}
	}
	@PostMapping("/updateRide")
	public ResponseEntity<?> updateRide(@RequestBody Ride uRide) {
		try {
			String status=this.dao.updateRide(uRide);
			return new ResponseEntity<Result>(new Result(status),HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(new Result("failure", 0), HttpStatus.OK);
		}

	}
}

@Component
class Login{
	private String emailId;
	private String password;
	
	public Login() {
		// TODO Auto-generated constructor stub
	}

	public String getEmailId() {
		return emailId;
	}

	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
}

