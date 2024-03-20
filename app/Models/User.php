<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function userSegmentTests()
    {
        return $this->hasMany(UserSegmentTest::class, 'user_id');
    }

    public function userMajorSegmentStatuses()
    {
        return $this->hasMany(UserMajorSegmentStatus::class, 'user_id');
    }

    public function userSegmentStatuses()
    {
        return $this->hasMany(UserSegmentStatus::class, 'user_id');
    }

    public function userWordTests()
    {
        return $this->hasMany(UserWordTest::class, 'user_id');
    }

    public function userWords()
    {
        return $this->hasMany(UserWord::class, 'user_id');
    }

    public function userArticles()
    {
        return $this->hasMany(UserArticle::class, 'user_id');
    }
}
