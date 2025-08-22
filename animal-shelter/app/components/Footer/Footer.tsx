"use client"
import GitHubButton from "react-github-btn";

export default function Footer() {
    return (
        <footer className="text-center border-t-4 border-t-gray-200">
            <span className="text-gray-600 italic mr-2">
                This page is copyright &copy; 2025 Norman B. Lancaster
            </span>
            <br/>
            <GitHubButton href="https://github.com/qbradq">Follow @qbradq</GitHubButton>
        </footer>
    )
}