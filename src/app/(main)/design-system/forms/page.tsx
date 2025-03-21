"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";

const BigFormPage: React.FC = () => {
  const [gender, setGender] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  return (
    <div className="p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h1 className="text-3xl font-bold">Design system form</h1>

        {/* Group 1: Personal Information */}
        <h2 className="text-2xl font-semibold mt-6">Personal Information</h2>
        <div className="space-y-4">
          <div>
            <Label htmlFor="full-name">Full Name</Label>
            <Input id="full-name" placeholder="Enter your full name" />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@example.com" />
          </div>
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="number"
              placeholder="Enter your phone number"
            />
          </div>
          <div>
            <Label htmlFor="address">Address</Label>
            <Textarea id="address" placeholder="Enter your address" rows={2} />
          </div>
          <div>
            <Label htmlFor="city">City</Label>
            <Input id="city" placeholder="City" />
          </div>
          <div>
            <Label htmlFor="state">State</Label>
            <Input id="state" placeholder="State" />
          </div>
          <div>
            <Label htmlFor="zip">Zip Code</Label>
            <Input id="zip" type="number" placeholder="Zip Code" />
          </div>
          {/* TODO remove this*/}
          <div className=" md:flex space-x-4">
            <div className="flex-1">
              <Label htmlFor="first-name">First Name</Label>
              <Input id="first-name" placeholder="Enter first name" />
            </div>
            <div className="flex-1">
              <Label htmlFor="last-name">Last Name</Label>
              <Input id="last-name" placeholder="Enter last name" />
            </div>
          </div>
          <div>
            <Label htmlFor="country">Country</Label>
            <Select>
              <SelectTrigger id="country">
                <SelectValue placeholder="Select your country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="usa">USA</SelectItem>
                <SelectItem value="canada">Canada</SelectItem>
                <SelectItem value="uk">UK</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="website">Website</Label>
            <Input id="website" type="url" placeholder="https://example.com" />
          </div>
          <div>
            <Label htmlFor="company">Company Name</Label>
            <Input id="company" placeholder="Your company name" />
          </div>
          <div>
            <Label htmlFor="job-title">Job Title</Label>
            <Input id="job-title" placeholder="Your job title" />
          </div>
        </div>

        {/* Group 2: Demographics */}
        <h2 className="text-2xl font-semibold mt-6">Demographics</h2>
        <div className="space-y-4">
          <div>
            <Label htmlFor="dob">Date of Birth</Label>
            <Input id="dob" type="date" />
          </div>
          <div>
            <Label>Gender</Label>
            <RadioGroup
              value={gender}
              onValueChange={setGender}
              className="flex space-x-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="male" id="gender-male" />
                <Label htmlFor="gender-male">Male</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="female" id="gender-female" />
                <Label htmlFor="gender-female">Female</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="other" id="gender-other" />
                <Label htmlFor="gender-other">Other</Label>
              </div>
            </RadioGroup>
          </div>
          <div>
            <Label>Marital Status</Label>
            <RadioGroup
              value={maritalStatus}
              onValueChange={setMaritalStatus}
              className="flex space-x-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="single" id="status-single" />
                <Label htmlFor="status-single">Single</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="married" id="status-married" />
                <Label htmlFor="status-married">Married</Label>
              </div>
            </RadioGroup>
          </div>
          <div>
            <Label htmlFor="children">Number of Children</Label>
            <Input id="children" type="number" placeholder="0" />
          </div>
          <div>
            <Label htmlFor="height">Height (cm)</Label>
            <Input id="height" type="number" placeholder="e.g. 170" />
          </div>
          <div>
            <Label htmlFor="weight">Weight (kg)</Label>
            <Input id="weight" type="number" placeholder="e.g. 65" />
          </div>
          <div>
            <Label htmlFor="fav-color">Favorite Color</Label>
            <Select>
              <SelectTrigger id="fav-color">
                <SelectValue placeholder="Select a color" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="red">Red</SelectItem>
                <SelectItem value="blue">Blue</SelectItem>
                <SelectItem value="green">Green</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Group 3: Interests */}
        <h2 className="text-2xl font-semibold mt-6">Interests</h2>
        <div className="space-y-4">
          <div>
            <Label>Hobbies</Label>
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="hobby-reading" />
                <Label htmlFor="hobby-reading">Reading</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="hobby-traveling" />
                <Label htmlFor="hobby-traveling">Traveling</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="hobby-gaming" />
                <Label htmlFor="hobby-gaming">Gaming</Label>
              </div>
            </div>
          </div>
          <div>
            <Label htmlFor="fav-food">Favorite Food</Label>
            <Input id="fav-food" placeholder="e.g. Pizza" />
          </div>
          <div>
            <Label htmlFor="fav-sport">Favorite Sport</Label>
            <Input id="fav-sport" placeholder="e.g. Soccer" />
          </div>
          <div>
            <Label htmlFor="fav-movie">Favorite Movie</Label>
            <Input id="fav-movie" placeholder="e.g. Inception" />
          </div>
          <div>
            <Label htmlFor="fav-book">Favorite Book</Label>
            <Input id="fav-book" placeholder="e.g. 1984" />
          </div>
        </div>

        {/* Group 4: Feedback */}
        <h2 className="text-2xl font-semibold mt-6">Feedback</h2>
        <div className="space-y-4">
          <div>
            <Label htmlFor="comments">Comments</Label>
            <Textarea id="comments" placeholder="Your comments" rows={3} />
          </div>
          <div>
            <Label htmlFor="additional-info">Additional Info</Label>
            <Textarea
              id="additional-info"
              placeholder="Any extra information"
              rows={3}
            />
          </div>
        </div>

        {/* Group 5: Scheduling */}
        <h2 className="text-2xl font-semibold mt-6">Scheduling</h2>
        <div className="space-y-4">
          <div>
            <Label htmlFor="contact-time">Preferred Contact Time</Label>
            <Input id="contact-time" type="time" />
          </div>
          <div>
            <Label htmlFor="appointment-date">Appointment Date</Label>
            <Input id="appointment-date" type="date" />
          </div>
          <div>
            <Label htmlFor="appointment-time">Appointment Time</Label>
            <Input id="appointment-time" type="time" />
          </div>
        </div>

        {/* Group 6: Files */}
        <h2 className="text-2xl font-semibold mt-6">Files</h2>
        <div className="space-y-4">
          <div>
            <Label htmlFor="profile-pic">Upload Profile Picture</Label>
            <Input id="profile-pic" type="file" />
          </div>
          <div>
            <Label htmlFor="resume">Upload Resume</Label>
            <Input id="resume" type="file" />
          </div>
          <div>
            <Label htmlFor="cover-letter">Cover Letter</Label>
            <Textarea
              id="cover-letter"
              placeholder="Enter your cover letter"
              rows={3}
            />
          </div>
        </div>

        {/* Group 7: Social Profiles */}
        <h2 className="text-2xl font-semibold mt-6">Social Profiles</h2>
        <div className="space-y-4">
          <div>
            <Label htmlFor="linkedin">LinkedIn URL</Label>
            <Input
              id="linkedin"
              type="url"
              placeholder="https://linkedin.com/in/username"
            />
          </div>
          <div>
            <Label htmlFor="github">GitHub URL</Label>
            <Input
              id="github"
              type="url"
              placeholder="https://github.com/username"
            />
          </div>
          <div>
            <Label htmlFor="twitter">Twitter Handle</Label>
            <Input id="twitter" placeholder="@username" />
          </div>
          <div>
            <Label htmlFor="facebook">Facebook URL</Label>
            <Input
              id="facebook"
              type="url"
              placeholder="https://facebook.com/username"
            />
          </div>
          <div>
            <Label htmlFor="instagram">Instagram Handle</Label>
            <Input id="instagram" placeholder="@username" />
          </div>
          <div>
            <Label htmlFor="youtube">YouTube URL</Label>
            <Input
              id="youtube"
              type="url"
              placeholder="https://youtube.com/channel/..."
            />
          </div>
        </div>

        {/* Group 8: Preferences */}
        <h2 className="text-2xl font-semibold mt-6">Preferences</h2>
        <div className="space-y-4">
          <div>
            <Label htmlFor="sound-pref">Sound Preference</Label>
            <Slider id="sound-pref" min={0} max={100} step={1} />
          </div>
          <div>
            <Label htmlFor="video-pref">Video Preference</Label>
            <Slider id="video-pref" min={0} max={100} step={1} />
          </div>
          <div>
            <Label htmlFor="satisfaction">Satisfaction</Label>
            <Slider id="satisfaction" min={0} max={10} step={1} />
          </div>
        </div>

        {/* Group 9: Agreements */}
        <h2 className="text-2xl font-semibold mt-6">Agreements</h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="agree-terms"
              checked={termsAccepted}
              onCheckedChange={setTermsAccepted}
            />
            <Label htmlFor="agree-terms">Agree to Terms and Conditions</Label>
          </div>
        </div>

        {/* Group 10: Emergency Contacts */}
        <h2 className="text-2xl font-semibold mt-6">Emergency Contacts</h2>
        <div className="space-y-4">
          <div>
            <Label htmlFor="emergency-name">Emergency Contact Name</Label>
            <Input id="emergency-name" placeholder="Contact Name" />
          </div>
          <div>
            <Label htmlFor="emergency-phone">Emergency Contact Phone</Label>
            <Input
              id="emergency-phone"
              type="tel"
              placeholder="Contact Phone"
            />
          </div>
        </div>

        {/* Group 11: Localization */}
        <h2 className="text-2xl font-semibold mt-6">Localization</h2>
        <div className="space-y-4">
          <div>
            <Label htmlFor="language">Preferred Language</Label>
            <Select>
              <SelectTrigger id="language">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="spanish">Spanish</SelectItem>
                <SelectItem value="french">French</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="timezone">Timezone</Label>
            <Select>
              <SelectTrigger id="timezone">
                <SelectValue placeholder="Select timezone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pst">PST</SelectItem>
                <SelectItem value="est">EST</SelectItem>
                <SelectItem value="cst">CST</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Group 12: Subscriptions */}
        <h2 className="text-2xl font-semibold mt-6">Subscriptions</h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox id="newsletter" />
            <Label htmlFor="newsletter">Subscribe to Newsletter</Label>
          </div>
        </div>

        {/* Group 13: Additional Comments */}
        <h2 className="text-2xl font-semibold mt-6">Additional Comments</h2>
        <div className="space-y-4">
          <div>
            <Label htmlFor="additional-comments">Additional Comments</Label>
            <Textarea
              id="additional-comments"
              placeholder="Your comments"
              rows={3}
            />
          </div>
        </div>

        {/* Group 14: Miscellaneous */}
        <h2 className="text-2xl font-semibold mt-6">Miscellaneous</h2>
        <div className="space-y-4">
          <div>
            <Label htmlFor="music-genre">Favorite Music Genre</Label>
            <Select>
              <SelectTrigger id="music-genre">
                <SelectValue placeholder="Select genre" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rock">Rock</SelectItem>
                <SelectItem value="pop">Pop</SelectItem>
                <SelectItem value="jazz">Jazz</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="fav-animal">Favorite Animal</Label>
            <Input id="fav-animal" placeholder="e.g. Dog" />
          </div>
          <div>
            <Label htmlFor="fav-season">Favorite Season</Label>
            <Select>
              <SelectTrigger id="fav-season">
                <SelectValue placeholder="Select season" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="spring">Spring</SelectItem>
                <SelectItem value="summer">Summer</SelectItem>
                <SelectItem value="autumn">Autumn</SelectItem>
                <SelectItem value="winter">Winter</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button type="submit" className="mt-6">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default BigFormPage;
