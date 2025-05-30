# fake-shopping-php
REST style E-Commerce Website with JavaScript & PHP ｜ no frameworks or libraries 

## Features
- Pure JavaScript frontend with no external libraries
- PHP backend implementing RESTful API principles
- Secure user authentication and registration system
- Product catalog with featured items and new arrivals
- Shopping cart functionality for both guest and logged-in users
- Stripe payment integration with MYR currency support
- Responsive design with modern UI/UX
- MySQL database integration

## Tech Stack
- Frontend: Vanilla JavaScript, HTML5, CSS3
- Backend: Pure PHP
- Database: MySQL (fakeshop schema)
- Payment: Stripe Checkout Integration

## Project Structure
```
user/
├── frontend/           # Client-side code
│   ├── *.js           # JavaScript modules
│   ├── *.html         # HTML pages
│   └── style.css      # Styling
└── backend/           # Server-side code
    ├── include/       # Core PHP components
    │   ├── db.php     # Database connection
    │   └── *.php      # Helper functions
    └── *.php          # API endpoints
```

## Setup
1. Clone the repository
2. Configure your MySQL database and update credentials in `backend/include/db.php`
3. Set up Stripe API keys for payment processing
4. Deploy to a PHP-enabled web server
5. Access the website through the frontend entry point

## Payment Processing
- Integrated with Stripe Checkout
- Supports Malaysian Ringgit (MYR) currency
- Handles both guest and authenticated user checkouts
- Automatic cart clearing after successful payment

## Security Features
- Secure user authentication
- Protected API endpoints


- Security headers implementation
- Safe database operations

## Demo
https://github.com/user-attachments/assets/8b8c1856-2f73-4a49-bfd3-8beaeef55aca

## Contributing
Feel free to fork the repository and submit pull requests for any improvements.

## License
MIT License

Copyright (c) 2025 Mustaffa96

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
