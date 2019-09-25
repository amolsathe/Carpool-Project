package com.app.dao;


import java.util.List;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;

import com.app.pojos.BookedRide;
import com.app.pojos.Car;
import com.app.pojos.Gendor;
import com.app.pojos.Ride;
import com.app.pojos.Rider;
import com.app.pojos.UserDetails;
import com.app.models.UserModel;


@Repository
@Transactional
public class UserDao {
	@Autowired
	private SessionFactory sf;
	
	public Integer validateUser(String email, String passwod) {
		String jpql="select u.userId from UserDetails u where u.emailId=:eml and u.password=:pswd";		
			return sf.getCurrentSession().createQuery(jpql, Integer.class).
					setParameter("eml", email).setParameter("pswd", passwod).getSingleResult();
	}
	public Integer getUserId(String email) {
		String jpql="select u.userId from UserDetails u where u.emailId=:eml";		
		return sf.getCurrentSession().createQuery(jpql, Integer.class).
				setParameter("eml", email).getSingleResult();
	}
	public boolean registerUser(UserDetails user)
	{
		try {
			this.sf.getCurrentSession().save(user);
			this.sf.getCurrentSession().flush();
			return true;
		} catch (Exception e) {
			return false;
		}
	}
	public UserDetails getSingleUser(int id)
	{
		try {
			UserDetails user= this.sf.getCurrentSession().get(UserDetails.class, id);
			user.getBookedRides().size();
			user.getRide().size();
			return user;
		} catch (Exception e) {
			return null;
		}
	}
	public boolean updateUser(UserModel usr)
	{
		try {
			UserDetails user= this.sf.getCurrentSession().get(UserDetails.class, usr.getUserId() );
			user.getBookedRides().size();
			user.getRide().size();
			user.setEmailId(usr.getEmailId());
			user.setContactNumber(usr.getContactNumber());
			user.setName(usr.getName());
			user.setGendor(Gendor.valueOf(usr.getGendor()));
			user.setDateOfBirth(usr.getDateOfBirth());
			user.setPassword(usr.getPassword());
			//this.sf.getCurrentSession().saveOrUpdate(user);
			this.sf.getCurrentSession().flush();
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}
	public int getUserStatus(int id)
	{
		try {
			UserDetails user= this.sf.getCurrentSession().get(UserDetails.class, id);
			//user.getBookedRides().size();
			//user.getRide().size();
			if (user.getRider()==null)
				return 1;
			else if(user.getCar()==null)
				return 2;
			else return 3;
		} catch (Exception e) {
			return 0;
		}
	}
	public String addRider(int id, Rider rider) {
		try {
			UserDetails user=this.sf.getCurrentSession().get(UserDetails.class, id);
			user.setRider(rider);
			this.sf.getCurrentSession().flush();
			return "success";
		} catch (Exception e) {
			return "failure";
		}
	}
	public String addCar(int id, Car car) {
		try {
			UserDetails user=this.sf.getCurrentSession().get(UserDetails.class, id);
			user.setCar(car);
			this.sf.getCurrentSession().flush();
			return "success";
		} catch (Exception e) {
			return "failure";
		}
	}
	public Car getCarDetails(int id) {
		try {
			UserDetails user=this.sf.getCurrentSession().get(UserDetails.class, id);
			//user.getCar().getCarId();
			return user.getCar();
		} catch (Exception e) {
			return null;
		}
	}
	public String addNewRide(int id, Ride ride) {
		try {
			UserDetails user=this.sf.getCurrentSession().get(UserDetails.class, id);
			List<Ride> rides=user.getRide();
			rides.add(ride);
			this.sf.getCurrentSession().flush();
			return "success";
		} catch (Exception e) {
			return "failure";
		}
	}
	//select r, u.name from Ride r join FETCH r.userDetails u where
	public List<Ride> findRide(Ride ride) {
		try {
			String jpql="select r from Ride r where "
					+ " r.originLat BETWEEN :olatl  and :olath   and "
					+ " r.originLng BETWEEN :olngl and :olngh and "
					+ " r.destLat BETWEEN :dlatl and :dlath   and "
					+ " r.destLng BETWEEN :dlngl and :dlngh  and "
					+ " r.date = :dte ";
			List<Ride> rides=this.sf.getCurrentSession().createQuery(jpql, Ride.class).
			setParameter("olatl", (ride.getOriginLat()-1)).
			setParameter("olath", (ride.getOriginLat()+1)).
			setParameter("olngl", (ride.getOriginLng()-1)).
			setParameter("olngh", (ride.getOriginLng()+1)).
			setParameter("dlatl", (ride.getDestLat()-1)).
			setParameter("dlath", (ride.getDestLat()+1)).
			setParameter("dlngl", (ride.getDestLng()-1)).
			setParameter("dlngh", (ride.getDestLng()+1)).
			setParameter("dte", ride.getDate()).
			getResultList();
//			List<Ride> rides=this.sf.getCurrentSession().createQuery("select r from Ride AS r", Ride.class).getResultList();
//			UserDetails user=this.sf.getCurrentSession().get(UserDetails.class, id);
//			List<Ride> rides=user.getRide();
//			rides.add(ride);
//			this.sf.getCurrentSession().flush();
			return rides;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	public String bookRide(BookedRide bRide) {
		try {
			UserDetails user=this.sf.getCurrentSession().get(UserDetails.class, bRide.getUserId());
			List<BookedRide> bride=user.getBookedRides();
			bride.add(bRide);
			Ride ride=this.sf.getCurrentSession().get(Ride.class, bRide.getRideId());
			int seats=ride.getAvailableSeats();
			ride.setAvailableSeats(seats-bRide.getSeatBooked());
			this.sf.getCurrentSession().flush();
			return "success";
		} catch (Exception e) {
			e.printStackTrace();
			return "failure";
		}
	}
	
	public List<BookedRide> getUserBookings(int id) {
		try {
			String jpql="select b from BookedRide b where b.userId=:uId";
			List<BookedRide> bList=this.sf.getCurrentSession().createQuery(jpql , BookedRide.class).
					setParameter("uId", id).getResultList();
			return bList;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	public List<Ride> getRides(int id) {
		try {
			String jpql="select r from Ride r where r.userId=:uId";
			List<Ride> bList=this.sf.getCurrentSession().createQuery(jpql , Ride.class).
					setParameter("uId", id).getResultList();
			return bList;
			
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	public String cancelBooking(int id) {
		try {
			BookedRide bride=this.sf.getCurrentSession().get(BookedRide.class, id);
			Ride ride=bride.getRide();
			ride.setAvailableSeats(ride.getAvailableSeats()+bride.getSeatBooked());
			this.sf.getCurrentSession().remove(bride);
			this.sf.getCurrentSession().flush();
			return "success";
		} catch (Exception e) {
			e.printStackTrace();
			return "failure";
		}
	}
	public String updateRide(Ride uRide) {
		try {
			this.sf.getCurrentSession().saveOrUpdate(uRide);
			this.sf.getCurrentSession().flush();
			return "success";
		} catch (Exception e) {
			e.printStackTrace();
			return "failure";
		}
	}
	
}
