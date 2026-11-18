import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, XCircle, MessageSquare, Send, ShieldAlert, Building2, Clock, FileText } from 'lucide-react';

const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace(/\/+$/, '');

export default function AdminPanel({ isOpen, onClose }) {
    const [ideas, setIdeas] = useState([]);
    const [selectedIdea, setSelectedIdea] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        if (isOpen) {
            fetchAdminIdeas();
        }
    }, [isOpen]);

    // Refresco automático del chat cada 5 segundos cuando hay una idea abierta
    useEffect(() => {
        if (!isOpen || !selectedIdea?.id) return;

        const interval = setInterval(() => {
            fetchMessages(selectedIdea.id);
        }, 5000);

        return () => clearInterval(interval);
    }, [isOpen, selectedIdea?.id]);

    // Cargar todas las ideas de los usuarios
    const fetchAdminIdeas = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_BASE_URL}/admin/ideas`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (!res.ok) return;
            const data = await res.json();
            setIdeas(data);
            if (data.length > 0 && !selectedIdea) {
                setSelectedIdea(data[0]);
                fetchMessages(data[0].id);
            }
        } catch (error) {
            console.error("Error al cargar ideas de admin:", error);
        }
    };

    // Cargar mensajes de una idea específica
    const fetchMessages = async (ideaId) => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_BASE_URL}/admin/ideas/${ideaId}/messages`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (!res.ok) return;
            const data = await res.json();
            setMessages(data);
        } catch (error) {
            console.error("Error al cargar mensajes:", error);
        }
    };

    // Enviar mensaje en el chat
    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !selectedIdea) return;

        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_BASE_URL}/admin/ideas/${selectedIdea.id}/messages`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ content: newMessage.trim() })
            });
            if (res.ok) {
                setNewMessage('');
                fetchMessages(selectedIdea.id);
            }
        } catch (error) {
            console.error("Error al enviar mensaje:", error);
        }
    };

    // Cambiar estado (Aceptar o Rechazar)
    const handleUpdateStatus = async (id, estado) => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_BASE_URL}/admin/ideas/${id}/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ estado })
            });
            if (!res.ok) {
                alert("No se pudo actualizar el estado.");
                return;
            }
            fetchAdminIdeas();
            if (selectedIdea?.id === id) {
                setSelectedIdea({ ...selectedIdea, estado });
            }
            alert(`Idea marcada como ${estado} exitosamente.`);
        } catch (error) {
            alert("Error al actualizar estado");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="bg-[#111827] text-slate-50 p-6 rounded-3xl border border-slate-800 max-w-5xl w-full h-[85vh] flex flex-col shadow-[0_0_50px_rgba(6,182,212,0.15)] relative">
                <header className="flex justify-between items-center pb-4 border-b border-slate-800">
                    <h3 className="text-xl font-bold flex items-center gap-2 text-cyan-400">
                        <ShieldAlert className="w-6 h-6" /> Panel de Administración - NovaCreativa
                    </h3>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-50 cursor-pointer">
                        <X className="w-6 h-6" />
                    </button>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1 overflow-hidden mt-4">
                    {/* Columna 1: Lista de Ideas */}
                    <div className="md:col-span-1 space-y-3 overflow-y-auto pr-2 border-r border-slate-800">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                            Ideas Recibidas ({ideas.length})
                        </h4>
                        {ideas.map(idea => (
                            <div
                                key={idea.id}
                                onClick={() => { setSelectedIdea(idea); fetchMessages(idea.id); }}
                                className={`p-3.5 rounded-xl border cursor-pointer transition-all ${selectedIdea?.id === idea.id
                                    ? 'bg-cyan-950/40 border-cyan-500/60 shadow-[0_0_15px_rgba(6,182,212,0.15)]'
                                    : 'bg-[#090D16] border-slate-800 hover:border-cyan-500/40'
                                    }`}
                            >
                                <div className="flex items-center gap-2 mb-1">
                                    <Building2 className="w-3.5 h-3.5 text-cyan-400" />
                                    <span className="text-xs text-cyan-300 font-semibold">
                                        {idea.user?.empresa || 'Empresa'}
                                    </span>
                                </div>
                                <h5 className="font-bold text-slate-50 text-sm line-clamp-1">{idea.titulo}</h5>
                                <p className="text-xs text-slate-400 mt-1">{idea.servicio}</p>
                                <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-800/80">
                                    <span
                                        className={`text-[10px] px-2 py-0.5 rounded font-semibold ${idea.estado === 'aceptada'
                                            ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/30'
                                            : idea.estado === 'rechazada'
                                                ? 'bg-red-950/60 text-red-300 border border-red-500/30'
                                                : 'bg-amber-950/60 text-amber-300 border border-amber-500/30'
                                            }`}
                                    >
                                        {idea.estado || 'en_revision'}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Columna 2 y 3: Detalles, Chat y Acciones */}
                    <div className="md:col-span-2 bg-[#090D16] rounded-2xl border border-slate-800 p-4 flex flex-col justify-between overflow-hidden">
                        {selectedIdea ? (
                            <>
                                {/* Cabecera y ficha de detalles de la idea seleccionada */}
                                <div className="pb-3 border-b border-slate-800 space-y-2.5">
                                    <div className="flex flex-wrap items-start justify-between gap-2">
                                        <div>
                                            <h4 className="font-bold text-base text-slate-50">{selectedIdea.titulo}</h4>
                                            <p className="text-xs text-slate-400 mt-0.5">
                                                Cliente:{' '}
                                                <span className="text-cyan-400">
                                                    {selectedIdea.user?.nombre} ({selectedIdea.user?.email})
                                                </span>
                                            </p>
                                            <div className="flex flex-wrap items-center gap-3 mt-1.5 text-xs text-slate-300">
                                                <span className="text-cyan-300 font-semibold">{selectedIdea.presupuesto}</span>
                                                {selectedIdea.tiempo && (
                                                    <span className="inline-flex items-center gap-1 text-slate-400">
                                                        <Clock className="w-3.5 h-3.5 text-cyan-400" />
                                                        {selectedIdea.tiempo}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleUpdateStatus(selectedIdea.id, 'aceptada')}
                                                className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white rounded-xl text-xs font-bold transition border border-emerald-500/40 cursor-pointer"
                                            >
                                                <CheckCircle2 className="w-4 h-4" /> Aceptar
                                            </button>
                                            <button
                                                onClick={() => handleUpdateStatus(selectedIdea.id, 'rechazada')}
                                                className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600/20 hover:bg-red-600 text-red-300 hover:text-white rounded-xl text-xs font-bold transition border border-red-500/40 cursor-pointer"
                                            >
                                                <XCircle className="w-4 h-4" /> Rechazar
                                            </button>
                                        </div>
                                    </div>

                                    {/* Detalles escritos por el cliente */}
                                    {selectedIdea.detalles && (
                                        <div className="p-2.5 rounded-xl bg-[#111827] border border-slate-800/90 text-xs text-slate-300">
                                            <span className="font-semibold text-cyan-400 inline-flex items-center gap-1 mb-1">
                                                <FileText className="w-3.5 h-3.5" /> Detalles del proyecto:
                                            </span>
                                            <p className="leading-relaxed text-slate-300">{selectedIdea.detalles}</p>
                                        </div>
                                    )}
                                </div>

                                {/* Historial de Mensajes tipo Chat */}
                                <div className="flex-1 overflow-y-auto py-4 space-y-3 px-2">
                                    {messages.length === 0 ? (
                                        <div className="text-center text-slate-500 my-auto pt-16">
                                            <MessageSquare className="w-10 h-10 mx-auto mb-2 opacity-30" />
                                            <p className="text-xs">
                                                No hay mensajes en esta conversación aún. Escribe el primer mensaje para coordinar detalles con el usuario.
                                            </p>
                                        </div>
                                    ) : (
                                        messages.map((msg, idx) => (
                                            <div
                                                key={msg.id || idx}
                                                className={`flex ${msg.senderId === 'admin-master-id' ? 'justify-end' : 'justify-start'}`}
                                            >
                                                <div
                                                    className={`max-w-[75%] p-3 rounded-2xl text-xs ${msg.senderId === 'admin-master-id'
                                                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-br-none'
                                                        : 'bg-slate-800 text-slate-200 rounded-bl-none'
                                                        }`}
                                                >
                                                    <p className="break-words">{msg.content}</p>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>

                                {/* Input de Enviar Mensaje */}
                                <form onSubmit={handleSendMessage} className="flex gap-2 pt-3 border-t border-slate-800">
                                    <input
                                        type="text"
                                        placeholder="Escribe un mensaje al usuario..."
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        maxLength={1000}
                                        className="flex-1 bg-[#111827] border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-50 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
                                    />
                                    <button
                                        type="submit"
                                        className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-4 py-2.5 rounded-xl font-bold flex items-center justify-center transition cursor-pointer"
                                    >
                                        <Send className="w-4 h-4" />
                                    </button>
                                </form>
                            </>
                        ) : (
                            <div className="text-center text-slate-500 my-auto">
                                <MessageSquare className="w-10 h-10 mx-auto mb-2 opacity-40" />
                                <p className="text-sm">Selecciona una idea de la izquierda para ver el chat y gestionarla.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}