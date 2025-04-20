# Corporate Ride Management System

This is the user interface for the Corporate Ride Management System built using React + Vite.
See https://github.com/engkit001/corporate-ride-management for details.

# Test Procedure for basic flow:

1. Go to _http://localhost:3000_
2. Login as _admin_ with password _12345_
3 Go to the Users tab and register 2 users with password _12345_:
    _EMP001_ with _PASSENGER_ role
    _DRIVER001_ with _DRIVER_ role
4. Go to the _Drivers_ tab and register a driver
    _DRIVER001_ (the Id has to match the username), _DRIVER001_, _12345678_, _ABC123D_
5. Note that the driver is shown with _Available_ status 
6. Login as _EMP001_
7. Request a ride from _A_ to _D_
8. Note that the ride is shown with _Requested_ status
9. Click on the _Rides_ tab to refresh the page
10. Note that the ride is now _Assigned_
11. Login as _DRIVER001_
12. Note that the ride is shown with a _Start_ button
13. Click _Start_
14. Note that the ride is now _Ongoing_ with a _Complete_ button
15. Click on _Complete_
16. Note that the ride is now _Completed_
