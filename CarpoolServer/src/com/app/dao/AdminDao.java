package com.app.dao;

import java.util.List;
import java.util.Set;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.app.pojos.AdminUser;
import com.app.pojos.UserDetails;

@Repository
@Transactional
public class AdminDao implements IAdminDao {

	@Autowired
	private SessionFactory db;
	
	@Override
	public AdminUser loginAdmin(AdminUser admin) {
		String jpql="select a from AdminUser a where a.emailId=:eml and a.password=:pswd";
		AdminUser a=null;
			a=db.getCurrentSession().createQuery(jpql, AdminUser.class).
					setParameter("eml", admin.getEmailId()).setParameter("pswd", admin.getPassword()).getSingleResult();
			return a;
	}

	@Override
	public boolean registerAdmin(AdminUser admin) {
		if (admin != null)
		{
			db.getCurrentSession().save(admin);
			return true;
		}
		return false;
	}

	@Override
	public List<UserDetails> getUsers() {
		String jpql="select a.userId, a.name, a.emailId, a.contactNumber, a.gendor, a.regDate, a.dateOfBirth from UserDetails a";
		return db.getCurrentSession().createQuery(jpql).getResultList();
	}

	@Override
	public String deleteUser(int id) {
		try {
			UserDetails user=this.db.getCurrentSession().get(UserDetails.class, id);
			this.db.getCurrentSession().remove(user);
			return "success";
		} catch (Exception e) {
			e.printStackTrace();
			return "failure";
		}
	}

}
