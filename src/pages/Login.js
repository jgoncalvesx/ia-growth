"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Brain, Chrome, Facebook, Github } from 'lucide-react';
import { toast } from 'sonner';
const Login = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = React.useState(false);
    const handleLogin = (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            toast.success('Bem-vindo ao Growth Midia IA!');
            navigate('/');
        }, 1500);
    };
    return (_jsx("div", { className: "min-h-screen bg-slate-50 flex items-center justify-center p-4 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]", children: _jsxs("div", { className: "w-full max-w-md space-y-8", children: [_jsxs("div", { className: "text-center space-y-2", children: [_jsx("div", { className: "inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-600 text-white shadow-xl mb-4", children: _jsx(Brain, { size: 32 }) }), _jsx("h1", { className: "text-4xl font-black text-slate-900 tracking-tight", children: "Growth Midia IA" }), _jsx("p", { className: "text-slate-500", children: "O sistema operacional do marketing moderno." })] }), _jsxs(Card, { className: "border-slate-200 shadow-2xl bg-white/80 backdrop-blur-sm", children: [_jsxs(CardHeader, { className: "space-y-1", children: [_jsx(CardTitle, { className: "text-2xl text-center", children: "Entrar na conta" }), _jsx(CardDescription, { className: "text-center", children: "Escolha seu m\u00E9todo de login preferido" })] }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "grid grid-cols-2 gap-3", children: [_jsxs(Button, { variant: "outline", className: "bg-white", children: [_jsx(Chrome, { className: "mr-2 h-4 w-4" }), " Google"] }), _jsxs(Button, { variant: "outline", className: "bg-white", children: [_jsx(Facebook, { className: "mr-2 h-4 w-4 text-blue-600" }), " Meta"] })] }), _jsxs("div", { className: "relative", children: [_jsx("div", { className: "absolute inset-0 flex items-center", children: _jsx("span", { className: "w-full border-t border-slate-200" }) }), _jsx("div", { className: "relative flex justify-center text-xs uppercase", children: _jsx("span", { className: "bg-white px-2 text-slate-400", children: "Ou use seu e-mail" }) })] }), _jsxs("form", { onSubmit: handleLogin, className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "email", children: "E-mail" }), _jsx(Input, { id: "email", type: "email", placeholder: "nome@empresa.com", required: true, className: "bg-white" })] }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx(Label, { htmlFor: "password", children: "Senha" }), _jsx("button", { type: "button", className: "text-xs text-blue-600 hover:underline", children: "Esqueceu a senha?" })] }), _jsx(Input, { id: "password", type: "password", required: true, className: "bg-white" })] }), _jsx(Button, { type: "submit", className: "w-full bg-blue-600 hover:bg-blue-700 h-11", disabled: loading, children: loading ? "Autenticando..." : "Entrar no Dashboard" })] })] })] }), _jsxs("p", { className: "text-center text-sm text-slate-500", children: ["N\u00E3o tem uma conta? ", _jsx("button", { className: "text-blue-600 font-bold hover:underline", children: "Comece seu teste gr\u00E1tis" })] })] }) }));
};
export default Login;
//# sourceMappingURL=Login.js.map