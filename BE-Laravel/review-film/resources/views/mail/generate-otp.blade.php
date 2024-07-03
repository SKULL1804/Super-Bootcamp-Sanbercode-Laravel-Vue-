<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Email Testing</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background-color: #f3f4f6;
            padding: 20px;
        }
        .container {
            background-color: #ffffff;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            margin-bottom: 20px;
        }
        .header h1 {
            font-size: 24px;
            font-weight: bold;
            color: #333333;
        }
        .content {
        	text-align: center;
            font-size: 16px;
            color: #555555;
            line-height: 1.5;
        }
        .content p {
            margin-bottom: 20px;
        }

        .content .code-otp {
        	font-size: 24px;
            font-weight: bold;
        }

    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Untuk {{ $name }} Generate OTP anda berhasil, silahkan ambil code OTP baru dibawah ini!</h1>
        </div>
        <div class="content">
            <p class="code-otp">{{ $otp }}</p>
            <p>Segera gunakan otp code, dalam 5 menit otp code kadaluarsa !</p>
        </div>
    </div>
</body>
</html>

